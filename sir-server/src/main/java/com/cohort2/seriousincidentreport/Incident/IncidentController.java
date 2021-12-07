package com.cohort2.seriousincidentreport.Incident;

import com.cohort2.seriousincidentreport.Individuals.IndividualsRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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
    private final IndividualsRepository individualRepository;

    private static final Logger log = LoggerFactory.getLogger(IncidentController.class);

    @PostMapping()
    public Incident postSingleIncident(@RequestBody Incident incident) {
        log.info("Received POST: " + incident.toString());
        return this.repository.save(incident);
    }

//    @GetMapping
//    public Iterable<Incident> getAllIncidents(@RequestParam(defaultValue = "5") int size, @RequestParam(defaultValue = "0") int page) {
//        final var pagedResults = this.repository.findAll(PageRequest.of(page, size));
//        if (pagedResults.hasContent())
//            return pagedResults.getContent();
//        else
//            return new ArrayList<Incident>();
//    }

    @GetMapping
    public ResponseEntity<Iterable<Incident>> getIncidents(Pageable pageable) {
        Iterable<Incident> incidents = new ArrayList<Incident>();
        try {
            incidents = this.repository.findAll(pageable);
        } catch (Exception e) {
            return new ResponseEntity<Iterable<Incident>>(incidents, null, 503);
        } finally {
            return new ResponseEntity<Iterable<Incident>>(incidents, null, 200);
        }
    }

    @GetMapping("/{id}")
    public Incident getSingleIncident(@PathVariable Long id){
        return this.repository.findById(id).get();
    }

    @PatchMapping("/{id}")
    public String updateSingleIncident(@PathVariable Long id, @RequestBody Incident updateIncident){
        if(this.repository.existsById(id)){
            this.repository.save(updateIncident);
            return "Incident Updated";
        } else {
            return "No incident found at ID " + id;
        }
    }
}
