package com.cohort2.seriousincidentreport.Patient;

import com.cohort2.seriousincidentreport.Incident.Incident;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter(value = AccessLevel.NONE)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "incident_id", nullable = true)
    @Getter(value = AccessLevel.NONE)
    @Setter(value = AccessLevel.NONE)
    private Incident incident;

    private String patientName;
    private String patientSocial;
    private String patientPhone;
    private String patientAddress;
}
