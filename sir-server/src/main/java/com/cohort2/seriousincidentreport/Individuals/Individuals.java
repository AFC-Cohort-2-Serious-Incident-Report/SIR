package com.cohort2.seriousincidentreport.Individuals;

import com.cohort2.seriousincidentreport.Incident.Incident;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter(value = AccessLevel.NONE)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "incident_id", nullable = true)
    @Getter(value = AccessLevel.NONE)
    @Setter(value = AccessLevel.NONE)
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
