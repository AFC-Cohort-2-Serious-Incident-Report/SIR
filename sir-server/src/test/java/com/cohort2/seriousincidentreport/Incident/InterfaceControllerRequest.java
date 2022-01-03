package com.cohort2.seriousincidentreport.Incident;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@Service
class InterfaceControllerRequests {
    private final String API_PATH = "/api/incidents/";

    @Autowired
    MockMvc mvc;

    ResultActions performGetAllIncidentsRequest() throws Exception {
        return mvc.perform(MockMvcRequestBuilders.get(API_PATH)
                .accept(MediaType.APPLICATION_JSON));
    }

    ResultActions performGETRequestForDetailedIncident(Long id) throws Exception {
        return mvc.perform(get(API_PATH + id)
                .accept(MediaType.APPLICATION_JSON));
    }

    ResultActions performGETRequestWithQuery(String query) throws Exception {
        return mvc.perform(get(API_PATH + "search?query=" + query)
                .accept(MediaType.APPLICATION_JSON));
    }
    ResultActions performGETRequestWithPageableData(int size, int page) throws Exception {
        return mvc.perform(get(API_PATH + "?size=%d&page=%d".formatted(size, page))
                .accept(MediaType.APPLICATION_JSON));
    }

    ResultActions performPATCHRequestOnIncident(Long id, String updatedIncident) throws Exception {
        return mvc.perform(patch(API_PATH + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedIncident));
    }

    ResultActions performPOSTRequest(String singleIncidentJSON) throws Exception {
        return mvc.perform(post(API_PATH)
                .contentType(MediaType.APPLICATION_JSON)
                .content(singleIncidentJSON));
    }
}