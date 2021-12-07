package com.cohort2.seriousincidentreport.Individuals;

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
public class Individuals {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "individuals_id")
    @JsonIgnore
    private Long id;

    @OneToOne(mappedBy = "individualsInvolved")
    @JsonIgnore
    private Incident incident;

//    @OneToOne(fetch = FetchType.LAZY, optional = true)
//    @MapsId
//    @JoinColumn(name = "incident_id", nullable = true)
//    @Getter(value = AccessLevel.PUBLIC)
//    @Setter(value = AccessLevel.PUBLIC)
//    private Incident incident;

    private boolean patient = false;
    private boolean familyMember = false;
    private boolean adult = false;
    private boolean child = false;
    private boolean staffMember = false;
    private boolean visitor = false;
    private boolean volunteer = false;
    private boolean other = false;
}
