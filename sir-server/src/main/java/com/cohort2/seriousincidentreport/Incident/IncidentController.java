package com.cohort2.seriousincidentreport.Incident;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;

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
    public Iterable<Incident> getAllIncidents(@RequestParam(defaultValue = "5") int size, @RequestParam(defaultValue = "0") int page) {
        final var pagedResults = this.repository.findAll(PageRequest.of(page, size));
        if (pagedResults.hasContent())
            return pagedResults.getContent();
        else
            return new ArrayList<Incident>();
    }
}
