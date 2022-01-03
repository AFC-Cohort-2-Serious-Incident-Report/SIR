package com.cohort2.seriousincidentreport;

import com.cohort2.seriousincidentreport.Incident.IncidentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;


@SpringBootTest
@AutoConfigureMockMvc
class ApplicationTests {

    @Autowired
    MockMvc mvc;

    @Autowired
    IncidentRepository repository;

    @Test
    void contextLoads() {
    }
}
