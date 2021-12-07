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
//    @Column(name = "patient_id")
    @JsonIgnore
    private Long id;

    @OneToOne(mappedBy = "patientInfo")
    @JsonIgnore
    private Incident incident;


//    @OneToOne(fetch = FetchType.LAZY, optional = true)
//    @MapsId
//    @JoinColumn(name = "incident_id", nullable = true)
//    //@Getter(value = AccessLevel.NONE)
//    //@Setter(value = AccessLevel.NONE)
//    private Incident incident;

    private String patientName;
    private String patientSocial;
    private String patientPhone;
    private String patientAddress;
}
