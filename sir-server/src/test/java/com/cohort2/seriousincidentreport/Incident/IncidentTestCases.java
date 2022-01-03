package com.cohort2.seriousincidentreport.Incident;

import com.cohort2.seriousincidentreport.Individuals.Individuals;
import com.cohort2.seriousincidentreport.Patient.Patient;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

public record IncidentTestCases() {
    public static String singleIncidentWithIDJSON(long id) {
        return """
                {
                "id": %d,
                "incidentDate": "2014-08-18",
                "incidentTime": "21:11",
                "incidentLocation": "Test location",
                "eventType": "Actual Event / Incident",
                "harmOrPotentialHarm": true,
                "individualsInvolved": {
                    "id": %d,
                    "patient": true,
                    "familyMember": false,
                    "adult": false,
                    "child": false,
                    "staffMember": false,
                    "visitor": false,
                    "volunteer": false,
                    "other": true
                    },
                "typeOfEvent": ["Adverse Drug Reaction", "Medication Related"],
                "effectOnIndividual": "Harm Sustained",
                "witnessOneName": "Sir Jackman",
                "witnessOnePhone": "719-526-6465",
                "witnessTwoName": "Hugh Jass",
                "witnessTwoPhone": "910-585-8101",
                "witnessThreeName": "Chuck Norris",
                "witnessThreePhone": "585-811-7777",
                "departmentsInvolved": ["Ambulatory Care", "Emergency Care"],
                "incidentDescription": "Test description",
                "preventativeAction": "Test action",
                "patientInfo": {
                    "id": %d,
                    "patientName": "Chuck Norris",
                    "patientSocial": "125-57-4578",
                    "patientPhone": "775-878-1257",
                    "patientAddress": "123 Main Street, San Diego, CA 92109"
                    }
                }
                """.formatted(id, id, id);
    }

    public static String swfIncidentJSON = """
            {
            "incidentDate": "2014-08-18",
            "incidentTime": "21:11",
            "incidentLocation": "SWF",
            "eventType": "Actual Event / Incident",
            "harmOrPotentialHarm": true,
            "individualsInvolved": {
                "patient": true,
                "other": true,
                "familyMember": true,
                "adult": true,
                "child": true,
                "staffMember": true,
                "visitor": true,
                "volunteer":true
                },
            "typeOfEvent": ["Adverse Drug Reaction", "Medication Related"],
            "effectOnIndividual": "Harm Sustained",
            "witnessOneName": "Sir Jackman",
            "witnessOnePhone": "719-526-6465",
            "witnessTwoName": "Hugh Jass",
            "witnessTwoPhone": "910-585-8101",
            "witnessThreeName": "Chuck Norris",
            "witnessThreePhone": "585-811-7777",
            "departmentsInvolved": ["Ambulatory Care", "Emergency Care"],
            "incidentDescription": "Test description",
            "preventativeAction": "Test action",
            "patientInfo": {
                "patientName": "Chuck Norris",
                "patientSocial": "125-57-4578",
                "patientPhone": "775-878-1257",
                "patientAddress": "123 Main Street, San Diego, CA 92109"
                }
            }
            """;

    public static Supplier<Incident> swfIncident = () -> {
        return Incident.builder()
                .incidentDate(LocalDate.parse("2014-08-18"))
                .incidentTime(LocalTime.parse("21:11"))
                .incidentLocation("SWF")
                .eventType("Actual Event / Incident")
                .harmOrPotentialHarm(true)
                .individualsInvolved(Individuals.builder().patient(true)
                        .other(true)
                        .familyMember(true)
                        .adult(true)
                        .child(true)
                        .staffMember(true)
                        .visitor(true)
                        .volunteer(true)
                        .build())
                .typeOfEvent(new ArrayList<>(List.of(new String[]{"Adverse Drug Reaction", "Medication Related"})))
                .effectOnIndividual("Harm Sustained")
                .witnessOneName("Sir Jackman")
                .witnessOnePhone("719-526-6465")
                .witnessTwoName("Hugh Jass")
                .witnessTwoPhone("910-585-8101")
                .witnessThreeName("Chuck Norris")
                .witnessThreePhone("585-811-7777")
                .departmentsInvolved(new ArrayList<String>(List.of(new String[]{"Ambulatory Care", "Emergency Care"})))
                .incidentDescription("Test description")
                .preventativeAction("Test action")
                .patientInfo(Patient.builder()
                        .patientName("Chuck Norris")
                        .patientSocial("125-57-4578")
                        .patientPhone("775-878-1257")
                        .patientAddress("123 Main Street, San Diego, CA 92109")
                        .build())
                .build();
    };
}
