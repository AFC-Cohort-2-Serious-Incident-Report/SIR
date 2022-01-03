package com.cohort2.seriousincidentreport.Incident;

import com.cohort2.seriousincidentreport.Individuals.Individuals;
import com.cohort2.seriousincidentreport.Patient.Patient;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Incident implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate incidentDate;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime incidentTime;
    private String incidentLocation;
    private String eventType;
    private boolean harmOrPotentialHarm;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "individuals_id")
    private Individuals individualsInvolved;
    @ElementCollection
    private List<String> typeOfEvent;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id")
    private Patient patientInfo;

    private String effectOnIndividual;
    private String witnessOneName;
    private String witnessOnePhone;
    private String witnessTwoName;
    private String witnessTwoPhone;
    private String witnessThreeName;
    private String witnessThreePhone;

    @ElementCollection
    private List<String> departmentsInvolved;

    private String incidentDescription;
    private String preventativeAction;

}
