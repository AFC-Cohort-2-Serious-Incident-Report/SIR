package com.cohort2.seriousincidentreport.Incident;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.transaction.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class IncidentControllerTests {

    @Autowired
    MockMvc mvc;

    @Autowired
    IncidentRepository repository;

    @Transactional
    @Rollback
    @Test
    public void testPostSeriousIncidentReportObject() throws Exception {
        //Setup
        String contentString = """
                {
                "incidentLocation": "Test location",
                "incidentDescription": "Test description",
                "preventativeAction": "Test action",
                "incidentDate": "2014-08-18",
                "incidentTime": "21:11",
                "eventType": "Actual Event / Incident",
                "harmOrPotentialHarm": true
                }
                """;

        //Execution
        MvcResult result = this.mvc.perform(post("/api/incidents")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentString))

                //Assertion
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.incidentDate").value("2014-08-18"))
                .andExpect(jsonPath("$.incidentTime").value("21:11"))
                .andReturn();

        var responseBody = result.getResponse().getContentAsString();
        int newEntryID = JsonPath.parse(responseBody).read("$.id");
        Optional<Incident> newEntry = repository.findById((long) newEntryID);
        assertTrue(newEntry.isPresent());

        final var savedIncident = newEntry.get();
        assertEquals("Test location", savedIncident.getIncidentLocation());
        assertEquals("Test description", savedIncident.getIncidentDescription());
        assertEquals("Test action", savedIncident.getPreventativeAction());
        assertEquals("2014-08-18", savedIncident.getIncidentDate().toString());
        assertEquals("21:11", savedIncident.getIncidentTime().toString());
        assertEquals("Actual Event / Incident", savedIncident.getEventType());
        assertTrue(savedIncident.isHarmOrPotentialHarm());
    }

}
