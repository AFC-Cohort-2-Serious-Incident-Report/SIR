package com.cohort2.seriousincidentreport.Patient;

import com.cohort2.seriousincidentreport.Incident.Incident;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    @OneToOne(mappedBy = "patientInfo")
    @JsonIgnore
    private Incident incident;

    private String patientName;
    private String patientSocial;
    private String patientPhone;
    private String patientAddress;
}
