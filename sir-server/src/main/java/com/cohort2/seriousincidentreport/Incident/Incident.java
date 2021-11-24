package com.cohort2.seriousincidentreport.Incident;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String incidentLocation;
    private String incidentDescription;
    private String preventativeAction;
    private String eventType;
    private boolean isHarmOrPotentialHarm;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate incidentDate;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime incidentTime;
}
