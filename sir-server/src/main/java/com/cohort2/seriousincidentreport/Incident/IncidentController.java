package com.cohort2.seriousincidentreport.Incident;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@AllArgsConstructor
@RequestMapping("/api/incidents")
@CrossOrigin
public class IncidentController {
    private final IncidentRepository repository;

    private static final Logger log = LoggerFactory.getLogger(IncidentController.class);

    @PostMapping()
    public Incident postSingleIncident(@RequestBody Incident incident) {
        log.info("Received POST: " + incident.toString());
        return this.repository.save(incident);
    }

    @GetMapping
    public Iterable<Incident> getAllIncidents() {
        return this.repository.findAll();
    }
}
