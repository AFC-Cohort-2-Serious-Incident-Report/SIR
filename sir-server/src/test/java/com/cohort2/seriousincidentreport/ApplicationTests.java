package com.cohort2.seriousincidentreport;

import com.cohort2.seriousincidentreport.Incident.IncidentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;


@SpringBootTest
@AutoConfigureMockMvc
class ApplicationTests {

    @Autowired
    MockMvc mvc;

    @Autowired
    IncidentRepository repository;

    @BeforeEach
    public void setupTest() {
//		(ObjectType) (ObjectName) = new (ObjectType) ()
//		(ObjectName.setter)
//				(this) (newObjectRepository) (method) ((newItem))
	}

        @Test
        void contextLoads () {
        }
//
//        @Transactional
//        @Rollback
//        @Test
//        public void sampleTest () THROWS Exception {
//            //Setup
//            Create New Item.
//                    Set New Item Properties.
//                    This.repository.save
//            Set id variable if needed. ( long =getid)
////Execution
//            this.mvc.perform(get / post / patch / delete("/url"))
//
////Assertion
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$[5].description", is("New Test Item!!")));
//        }


    }
