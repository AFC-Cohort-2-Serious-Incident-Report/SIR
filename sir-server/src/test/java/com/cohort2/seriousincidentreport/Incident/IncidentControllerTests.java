package com.cohort2.seriousincidentreport.Incident;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import javax.transaction.Transactional;

import java.util.Optional;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.web.servlet.function.RequestPredicates.contentType;


@SpringBootTest
@AutoConfigureMockMvc
class IncidentControllerTests {

    @Autowired
    MockMvc mvc;

    @Autowired
    IncidentRepository repository;

    Incident incident1 = new Incident();
    Incident incident2 = new Incident();
    Incident incident3 = new Incident();

    @BeforeEach
    @Transactional
    @Rollback
    public void setUp() {
    incident1.setIncidentLocation("location1");
    incident1.setIncidentDescription("description1");
    incident1.setPreventativeAction("action1");

    incident2.setIncidentLocation("location2");
    incident2.setIncidentDescription("description2");
    incident2.setPreventativeAction("action2");

    incident3.setIncidentLocation("location3");
    incident3.setIncidentDescription("description3");
    incident3.setPreventativeAction("action3");

    repository.save(incident1);
    repository.save(incident2);
    repository.save(incident3);

    }

    @Transactional
    @Rollback
    @Test
    public void testGetSIRLists() throws Exception {
        //Setup
        MockHttpServletRequestBuilder request = get("/api/incidents")
                .accept(MediaType.APPLICATION_JSON);

        ResultActions perform =this.mvc.perform(request);

        perform.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", equalTo(incident1.getId().intValue())))
                .andExpect(jsonPath("$[0].incidentLocation", equalTo(incident1.getIncidentLocation())))
                .andExpect(jsonPath("$[0].incidentDescription", equalTo(incident1.getIncidentDescription())))
                .andExpect(jsonPath("$[0].preventativeAction", equalTo(incident1.getPreventativeAction())))
                .andExpect(jsonPath("$.length()", equalTo(3)));

    }

    @Transactional
    @Rollback
    @Test
    public void testPostSeriousIncidentReportObject() throws Exception {
        //Setup
        String contentString = """
                {
                "incidentLocation": "Test location",
                "incidentDescription": "Test description",
                "preventativeAction": "Test action"
                }
                """;

        //Execution
        MvcResult result = this.mvc.perform(post("/api/incidents")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentString))

                //Assertion
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andReturn();

        var responseBody = result.getResponse().getContentAsString();
        int newEntryID = JsonPath.parse(responseBody).read("$.id");
        Optional<Incident> newEntry = repository.findById(Long.valueOf(newEntryID));
        assertTrue(newEntry.isPresent());

        final var savedIncident = newEntry.get();
        assertEquals("Test location", savedIncident.getIncidentLocation());
        assertEquals("Test description", savedIncident.getIncidentDescription());
        assertEquals("Test action", savedIncident.getPreventativeAction());
    }

}
