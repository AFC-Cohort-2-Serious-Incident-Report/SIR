package com.cohort2.seriousincidentreport.Incident;

import com.cohort2.seriousincidentreport.Individuals.Individuals;
import com.cohort2.seriousincidentreport.Patient.Patient;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table (name="incident")
public class Incident implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate incidentDate;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime incidentTime;
    private String incidentLocation;
    private String eventType;
    private boolean harmOrPotentialHarm;
    @OneToOne(mappedBy = "incident", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Individuals individualsInvolved;
    private String typeOfEvent;
    private String effectOnIndividual;
    private String witnessOneName;
    private String witnessOnePhone;
    private String witnessTwoName;
    private String witnessTwoPhone;
    private String witnessThreeName;
    private String witnessThreePhone;
    private String departmentsInvolved;
    private String incidentDescription;
    private String preventativeAction;
    @OneToOne(mappedBy = "incident", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Patient patientInfo;
}
