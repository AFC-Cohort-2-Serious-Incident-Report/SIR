package com.cohort2.seriousincidentreport.Individuals;

import com.cohort2.seriousincidentreport.Incident.Incident;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Individuals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "individualsInvolved")
    @JsonIgnore
    private Incident incident;

    private boolean patient = false;
    private boolean familyMember = false;
    private boolean adult = false;
    private boolean child = false;
    private boolean staffMember = false;
    private boolean visitor = false;
    private boolean volunteer = false;
    private boolean other = false;
}
