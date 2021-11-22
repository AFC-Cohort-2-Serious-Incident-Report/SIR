package com.cohort2.seriousincidentreport.Incident;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {
    private final IncidentRepository repository;

    public IncidentController(IncidentRepository repository) {
        this.repository = repository;
    }

    @PostMapping()
    public Incident postSingleIncident(@RequestBody Incident incident) {
        return this.repository.save(incident);
    }
}
