package com.cohort2.seriousincidentreport.Incident;

import org.springframework.data.domain.Page;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Pageable;

public interface IncidentRepository extends PagingAndSortingRepository<Incident, Long> {
    Page<Incident> findAllByPatientInfo_PatientNameContaining(String patientName, Pageable pageable);
//    Optional<Incident> findAllByPatientInfo_PatientNameLike(String name, Pageable pageable);
}
