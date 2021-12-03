package com.cohort2.seriousincidentreport.Incident;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Pageable;

public interface IncidentRepository extends PagingAndSortingRepository<Incident, Long> {
//  Iterable<Incident> findByIncidentLocationContaining(String location, Pageable pageable);
//  Iterable<Incident> findByHarmOrPotentialHarmContaining(String location, Pageable pageable);
}
