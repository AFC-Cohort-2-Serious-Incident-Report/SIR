package com.cohort2.seriousincidentreport.Incident;

import com.fasterxml.jackson.databind.ObjectMapper;
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
                "incidentDate": "2014-08-18",
                "incidentTime": "21:11",
                "incidentLocation": "Test location",
                "eventType": "Actual Event / Incident",
                "harmOrPotentialHarm": true,
                "individualsInvolved": {
                    "patient": true,
                    "other": true
                    },
                "typeOfEvent": "Adverse Drug Reaction, Medication Related",
                "effectOnIndividual": "Harm Sustained",
                "witnessOneName": "Sir Jackman",
                "witnessOnePhone": "719-526-6465",
                "witnessTwoName": "Hugh Jass",
                "witnessTwoPhone": "910-585-8101",
                "witnessThreeName": "Chuck Norris",
                "witnessThreePhone": "585-811-7777",
                "departmentsInvolved": "Ambulatory Care, Emergency Care",
                "incidentDescription": "Test description",
                "preventativeAction": "Test action",
                "patientInfo": {
                    "patientName": "Chuck Norris",
                    "patientSocial": "125-57-4578",
                    "patientPhone": "775-878-1257",
                    "patientAddress": "123 Main Street, San Diego, CA 92109"
                    }
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

        ObjectMapper objectMapper1 = new ObjectMapper();
        String individualsInvolved = objectMapper1.writeValueAsString(savedIncident.getIndividualsInvolved());

        ObjectMapper objectMapper2 = new ObjectMapper();
        String patientInfo = objectMapper2.writeValueAsString(savedIncident.getPatientInfo());


        assertEquals("2014-08-18", savedIncident.getIncidentDate().toString());
        assertEquals("21:11", savedIncident.getIncidentTime().toString());
        assertEquals("Test location", savedIncident.getIncidentLocation());
        assertEquals("Actual Event / Incident", savedIncident.getEventType());
        assertTrue(savedIncident.isHarmOrPotentialHarm());
        assertEquals("{\"patient\":true,\"familyMember\":false,\"adult\":false,\"child\":false,\"staffMember\":false,\"visitor\":false,\"volunteer\":false,\"other\":true}", individualsInvolved);
        assertEquals("Adverse Drug Reaction, Medication Related", savedIncident.getTypeOfEvent());
        assertEquals("Harm Sustained", savedIncident.getEffectOnIndividual());
        assertEquals("Sir Jackman", savedIncident.getWitnessOneName());
        assertEquals("719-526-6465", savedIncident.getWitnessOnePhone());
        assertEquals("Hugh Jass", savedIncident.getWitnessTwoName());
        assertEquals("910-585-8101", savedIncident.getWitnessTwoPhone());
        assertEquals("Chuck Norris", savedIncident.getWitnessThreeName());
        assertEquals("585-811-7777", savedIncident.getWitnessThreePhone());
        assertEquals("Ambulatory Care, Emergency Care", savedIncident.getDepartmentsInvolved());
        assertEquals("Test description", savedIncident.getIncidentDescription());
        assertEquals("Test action", savedIncident.getPreventativeAction());
        assertEquals("{\"patientName\":\"Chuck Norris\",\"patientSocial\":\"125-57-4578\",\"patientPhone\":\"775-878-1257\",\"patientAddress\":\"123 Main Street, San Diego, CA 92109\"}", patientInfo);
    }
}
