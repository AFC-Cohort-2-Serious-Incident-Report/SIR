package com.cohort2.seriousincidentreport.Incident;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/incidents")
public class IncidentController {
    private final IncidentRepository repository;

    @PostMapping()
    public Incident postSingleIncident(@RequestBody Incident incident) {
        return this.repository.save(incident);
    }
}
