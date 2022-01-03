package com.cohort2.seriousincidentreport.Incident;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;

import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.IntStream;

import static com.cohort2.seriousincidentreport.Incident.IncidentTestCases.*;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class IncidentControllerTests {

    @Autowired
    MockMvc mvc;
    @Autowired
    IncidentRepository repository;
    @Autowired
    InterfaceControllerRequests requests;
    @Autowired
    ObjectMapper mapper;

    Incident[] initialIncidents;
    Supplier<Incident> defaultTestCase;
    String defaultTestCaseJSON;

    @BeforeEach
    @Transactional
    @Rollback
    public void setUp() {
        defaultTestCase = swfIncident;
        defaultTestCaseJSON = swfIncidentJSON;

        initialIncidents = IntStream.rangeClosed(1, 3)
                .mapToObj(i -> defaultTestCase.get())
                .map(repository::save)
                .toArray(Incident[]::new);
    }

    @Transactional
    @Rollback
    @Test
    public void testGetSIRLists() throws Exception {
        requests.performGetAllIncidentsRequest()
                .andExpect(status().isOk())
                .andExpect(contentMatchesAllSavedIncidents());
    }

    @Transactional
    @Rollback
    @Test
    public void getDetailedIncident() throws Exception {
        requests.performGETRequestForDetailedIncident(initialIncidents[0].getId())
                .andExpect(status().isOk())
                .andExpect(content().json(defaultTestCaseJSON));
    }

    @Transactional
    @Rollback
    @Test
    public void updateSingleIncident() throws Exception {
        requests.performPATCHRequestOnIncident(initialIncidents[0].getId(), singleIncidentWithIDJSON(initialIncidents[0].getId()))
                .andExpect(status().isOk())
                .andExpect(content().string("Incident Updated"));

        savedRecordMatchesPATCHJSON(initialIncidents[0].getId());
    }

    @Test
    @Transactional
    @Rollback
    void shouldReturnNumberOfEntriesInPagination() throws Exception {
        requests.performGETRequestWithPageableData(2, 1)
                .andExpect(status().isOk())
                .andExpect(contentMatchesIncidents(Collections.singleton(initialIncidents[2])));
    }

    @Transactional
    @Rollback
    @Test
    public void testPostSeriousIncidentReportObject() throws Exception {
        MvcResult result = requests.performPOSTRequest(defaultTestCaseJSON)
                .andExpect(status().isOk())
                .andExpect(content().json(defaultTestCaseJSON))
                .andReturn();

        savedRecordMatchesPOSTJSON(result);
    }

    @Transactional
    @Rollback
    @Test
    public void testSearchIncidentByPatientName() throws Exception {
        requests.performGETRequestWithQuery("SWF")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(3));
    }

    private ResultMatcher contentMatchesAllSavedIncidents() throws JsonProcessingException {
        return content().json(mapper.writeValueAsString(
                new PageableResponseWithList(repository.findAll())));
    }

    private ResultMatcher contentMatchesIncidents(Iterable<Incident> incidents) throws JsonProcessingException {
        return content().json(mapper.writeValueAsString(
                new PageableResponseWithList(incidents)));
    }

    private void savedRecordMatchesPATCHJSON(Long savedID) throws JSONException, JsonProcessingException {
        final Incident savedIncident = getIncidentByID(savedID);
        JSONAssert.assertEquals(singleIncidentWithIDJSON(savedID), mapper.writeValueAsString(savedIncident), true);
    }

    private void savedRecordMatchesPOSTJSON(MvcResult result) throws UnsupportedEncodingException, JSONException, JsonProcessingException {
        int newEntryID = parseResultsForIncidentID(result);
        final Incident savedIncident = getIncidentByID((long) newEntryID);

        JSONAssert.assertEquals(defaultTestCaseJSON, mapper.writeValueAsString(savedIncident), false);
    }

    private int parseResultsForIncidentID(MvcResult result) throws UnsupportedEncodingException {
        var responseBody = result.getResponse().getContentAsString();
        return JsonPath.parse(responseBody).read("$.id");
    }

    private Incident getIncidentByID(Long savedID) {
        Optional<Incident> savedIncidentQuery = repository.findById(savedID);
        assertTrue(savedIncidentQuery.isPresent());

        return savedIncidentQuery.get();
    }

    private record PageableResponseWithList(Iterable<Incident> content) {
    }
}
