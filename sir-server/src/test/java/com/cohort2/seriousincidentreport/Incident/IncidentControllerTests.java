package com.cohort2.seriousincidentreport.Incident;

import com.cohort2.seriousincidentreport.Incident.IncidentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static org.hamcrest.core.Is.is;

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
    public void sampleTest() throws Exception {
        //Setup
        String contentString = """
                {
                "location": "Test Location"
                }
                """;

        //Execution
        this.mvc.perform(post("/api/incidents")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentString))

                //Assertion
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.location", is("Test Location")))
                .andExpect(jsonPath("$.id").isNumber());
    }
}
