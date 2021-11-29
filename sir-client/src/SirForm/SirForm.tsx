import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

interface Values {
    incidentDate: string;
    incidentTime: string;
    incidentLocation: string;
    eventType: string;
    harmOrPotentialHarm: boolean,
    individualsInvolved: string,
    typeOfEvent: string,
    effectOnIndividual: string,
    witnessOneName: string;
    witnessOnePhone: string;
    witnessTwoName: string;
    witnessTwoPhone: string;
    witnessThreeName: string;
    witnessThreePhone: string;
    departmentsInvolved: string,
    incidentDescription: string;
    preventativeAction: string;
    patientInfo: string;
}

const incidentSchema = Yup.object().shape({
  incidentDate: Yup.string()
    .required('Required'),
  incidentTime: Yup.string()
    .required('Required'),
  incidentLocation: Yup.string()
    .notRequired(),
  eventType: Yup.string()
    .required('Required'),
  harmOrPotentialHarm: Yup.boolean()
    .required('Required'),
  individualsInvolved: Yup.string()
    .required('Required'),
  typeOfEvent: Yup.string()
    .required('Required'),
  effectOnIndividual: Yup.string()
    .required('Required'),
  witnessOneName: Yup.string()
    .notRequired(),
  witnessOnePhone: Yup.string()
    .notRequired(),
  witnessTwoName: Yup.string()
    .notRequired(),
  witnessTwoPhone: Yup.string()
    .notRequired(),
  witnessThreeName: Yup.string()
    .notRequired(),
  witnessThreePhone: Yup.string()
    .notRequired(),
  departmentsInvolved: Yup.string()
    .required('Required'),
  incidentDescription: Yup.string()
    .required('Required'),
  preventativeAction: Yup.string()
    .required('Required'),
  patientInfo: Yup.string()
    .required('Required'),
});

function convertDate(date: Date): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

const SirForm: React.FC = () => {
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleSubmitClick = (values: Values) => {
    axios.post('/api/incidents', values)
      .then(() => setReportSubmitted(true));
  };

  return (
    <div>
      <div>
        {reportSubmitted
          ? 'Incident Report Submitted' : null}
      </div>
      <div>
        <Formik
          initialValues={{
            incidentDate: convertDate(new Date()),
            incidentTime: '',
            incidentLocation: '',
            eventType: '',
            harmOrPotentialHarm: false,
            individualsInvolved: '',
            typeOfEvent: '',
            effectOnIndividual: '',
            witnessOneName: '',
            witnessOnePhone: '',
            witnessTwoName: '',
            witnessTwoPhone: '',
            witnessThreeName: '',
            witnessThreePhone: '',
            departmentsInvolved: '',
            incidentDescription: '',
            preventativeAction: '',
            patientInfo: '',
          }}
          validationSchema={incidentSchema}
          onSubmit={handleSubmitClick}
        >
          {(formik) => {
            const {
              isValid, dirty,
            } = formik;
            return (
              <div className="container">
                <h1>Incident Report Form</h1>
                <Form>
                  <div className="group split">
                    <div className="group">
                      <label htmlFor="incidentDate">Date of Event</label>
                      <Field type="date" id="incidentDate" name="incidentDate" />
                    </div>
                    <div className="group">
                      <label htmlFor="incidentTime">Time of Event</label>
                      <Field type="time" id="incidentTime" name="incidentTime" />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="incidentLocation">Incident Location</label>
                    <Field type="text" id="incidentLocation" name="incidentLocation" />
                  </div>
                  <div className="group split">
                    <div className="group">
                      <label htmlFor="eventType">Event Type</label>
                      <Field type="select" as="select" id="eventType" name="eventType">
                        <option value="Actual Event">Actual Event / Incident</option>
                        <option value="Not Actual Event">Not Actual Event / Incident</option>
                        <option value="Training Event">Training Event / Not Real</option>
                      </Field>
                    </div>
                    <div className="group">
                      <label htmlFor="harmOrPotentialHarm">Harm or Potential Harm</label>
                      <Field type="select" as="select" id="harmOrPotentialHarm" name="harmOrPotentialHarm">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </Field>
                    </div>
                  </div>
                  <div className="group split">
                    <div className="group">
                      <label htmlFor="individualsInvolved">Individuals Involved</label>
                      <Field type="checkbox" name="individualsInvolved.patient" />
                      Patient
                      <Field type="checkbox" name="individualsInvolved.familyMember" />
                      Family Member
                      <Field type="checkbox" name="individualsInvolved.adult" />
                      Adult
                      <Field type="checkbox" name="individualsInvolved.child" />
                      Child less than 18 years old
                    </div>
                    <div className="group">
                      <Field type="checkbox" name="individualsInvolved.staffMember" />
                      Staff Member
                      <Field type="checkbox" name="individualsInvolved.visitor" />
                      Visitor
                      <Field type="checkbox" name="individualsInvolved.volunteer" />
                      Volunteer
                      <Field type="checkbox" name="individualsInvolved.other" />
                      Other
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="typeOfEvent">Type of Event</label>
                    <Field type="text" id="typeOfEvent" name="typeOfEvent" title="typeOfEvent" />
                  </div>
                  <div className="group">
                    <label htmlFor="effectOnIndividual">Harm or Potential Harm</label>
                    <Field type="select" as="select" id="effectOnIndividual" name="effectOnIndividual">
                      <option value="Harm Sustained">Harm Sustained</option>
                      <option value="No Harm Sustained">No Harm Sustained</option>
                    </Field>
                  </div>
                  <div className="group split">
                    <div className="group">
                      <label htmlFor="witnessOneName">Witness Name</label>
                      <Field type="text" id="witnessOneName" name="witnessOneName" title="witnessOneName" />
                      <Field type="text" id="witnessTwoName" name="witnessTwoName" title="witnessTwoName" />
                      <Field type="text" id="witnessThreeName" name="witnessThreeName" title="witnessThreeName" />
                    </div>
                    <div className="group">
                      <label htmlFor="witnessOnePhone">Witness Phone</label>
                      <Field type="text" id="witnessOnePhone" name="witnessOnePhone" title="witnessOnePhone" />
                      <Field type="text" id="witnessTwoPhone" name="witnessTwoPhone" title="witnessTwoPhone" />
                      <Field type="text" id="witnessThreePhone" name="witnessThreePhone" title="witnessThreePhone" />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="departmentsInvolved">Department(s) Involved in this Incident</label>
                    <Field type="text" id="departmentsInvolved" name="departmentsInvolved" title="departmentsInvolved" />
                  </div>
                  <div className="group">
                    <label htmlFor="incidentDescription">Incident Description</label>
                    <Field type="text" as="textarea" id="incidentDescription" name="incidentDescription" />
                  </div>
                  <div className="group">
                    <label htmlFor="preventativeAction">Preventative Action</label>
                    <Field type="text" as="textarea" id="preventativeAction" name="preventativeAction" />
                  </div>
                  <div className="group">
                    <label htmlFor="patientInfo.patientName">Patient Name or ID Plate</label>
                    <Field type="text" id="patientInfo.patientName" name="patientInfo.patientName" title="patientInfo.patientName" />
                  </div>
                  <div className="group split">
                    <div className="group">
                      <label htmlFor="patientInfo">Patient SSN</label>
                      <Field type="text" id="patientInfo.patientSocial" name="patientInfo.patientSocial" title="patientInfo.patientSocial" />
                    </div>
                    <div className="group">
                      <label htmlFor="patientInfo">Patient Telephone Number</label>
                      <Field type="text" id="patientInfo.patientPhone" name="patientInfo.patientPhone" title="patientInfo.patientPhone" />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="patientInfo">Patient Address</label>
                    <Field type="text" id="patientInfo.patientAddress" name="patientInfo.patientAddress" title="patientInfo.patientAddress" />
                  </div>
                  <div className="group flex">
                    <button
                      type="submit"
                      className="primary right"
                      disabled={!(dirty && isValid)}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SirForm;
