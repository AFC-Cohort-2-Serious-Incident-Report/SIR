import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import CustomAlert from '../StyledComponents/CustomAlert';

interface Values {
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  incidentDescription: string;
  preventativeAction: string;
}

const incidentSchema = Yup.object().shape({
  incidentDate: Yup.string()
    .required('Required'),
  incidentTime: Yup.string()
    .required('Required'),
  incidentLocation: Yup.string()
    .required('Required'),
  incidentDescription: Yup.string()
    .required('Required'),
  preventativeAction: Yup.string()
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
      <nav className="navbar">
        <div className="logo" />
        <div className="link">
          Responder
          Reporter
        </div>
      </nav>
      {
        reportSubmitted && (
          <CustomAlert
            text="Incident Report Submitted"
            onClick={() => {
              alert('test');
            }}
            close={() => setReportSubmitted(false)}
          />
        )
      }
      <div>
        <Formik
          initialValues={{
            incidentDate: convertDate(new Date()),
            incidentTime: '',
            incidentLocation: '',
            eventType: '', // Select Box
            harmOrPotentialHarm: '', // Select Box
            // Individuals Involved Checkboxes
            typeOfEvent: '',
            effectOnIndividuals: '', // Select Box
            witness1name: '',
            witness2name: '',
            witness3name: '',
            witness1number: '',
            witness2number: '',
            witness3number: '',
            departmentsInvolved: '',
            incidentDescription: '',
            preventativeAction: '',
            patientNameOrID: '',
            patientSSN: '',
            patientNumber: '',
            patientAddress: '',
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
                      <label htmlFor="dateOfEvent">Date of Event</label>
                      <Field type="date" id="dateOfEvent" name="incidentDate" />
                    </div>
                    <div className="group">
                      <label htmlFor="timeOfEvent">Time of Event</label>
                      <Field type="time" id="timeOfEvent" name="incidentTime" />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="incidentLocation">Location of Event</label>
                    <Field type="text" id="incidentLocation" name="incidentLocation" />
                  </div>
                  <div className="group split">
                    <div className="group">
                      <label htmlFor="eventType">Event Type</label>
                      <Field as="select" id="eventType" name="eventType">
                        <option value="NEEDSVALUE1">Actual Event / Incident</option>
                      </Field>
                    </div>
                    <div className="group">
                      <label htmlFor="harmOrPotentialHarm">Harm or Potential Harm</label>
                      <Field as="select" id="harmOrPotentialHarm" name="harmOrPotentialHarm">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </Field>
                    </div>
                  </div>
                  <div className="group split">
                    <div className="group">
                      <label htmlFor="fakeNameForNow">Individuals Involved</label>
                    </div>
                    <div className="group">
                      Placeholder
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="typeOfEvent">Type of Event</label>
                    <Field type="text" id="typeOfEvent" name="typeOfEvent" />
                  </div>
                  <div className="group">
                    <label htmlFor="effectOnIndividuals">Effect on this Incident of the individual(s) Involved</label>
                    <Field as="select" id="effectOnIndividuals" name="effectOnIndividuals">
                      <option value="NoHarm">No harm sustained</option>
                      <option value="MinorInjury">Minor Injury</option>
                      <option value="MajorInjury">Major Injury</option>
                      <option value="Fatality">Fatality</option>
                    </Field>
                  </div>
                  <div className="group split">
                    <div className="group">
                      <label htmlFor="not-needed">Witness Name</label>
                      <Field type="text" id="witness1name" name="witness1name" />
                      <Field type="text" id="witness2name" name="witness2name" />
                      <Field type="text" id="witness3name" name="witness3name" />
                    </div>
                    <div className="group">
                      <label htmlFor="not-needed">Witness Telephone Number</label>
                      <Field type="text" id="witness1number" name="witness1number" />
                      <Field type="text" id="witness2number" name="witness2number" />
                      <Field type="text" id="witness3number" name="witness3number" />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="departmentsInvolved">Department(s) Involved in this Incident</label>
                    <Field type="text" id="departmentsInvolved" name="departmentsInvolved" />
                  </div>
                  <div className="group">
                    <label htmlFor="incidentDescription">Description of Incident</label>
                    <Field type="text" as="textarea" id="incidentDescription" name="incidentDescription" />
                  </div>
                  <div className="group">
                    <label htmlFor="preventativeAction">
                      What actions, if any, could have been taken to prevent this incident?
                    </label>
                    <Field type="text" as="textarea" id="preventativeAction" name="preventativeAction" />
                  </div>
                  <div className="group">
                    <label htmlFor="patientNameOrID">Patient Name or ID Plate</label>
                    <Field type="text" id="patientNameOrID" name="patientNameOrID" />
                  </div>
                  <div className="group split">
                    <div className="group">
                      <label htmlFor="patientSSN">Patient SSN</label>
                      <Field type="text" id="patientSSN" name="patientSSN" />
                    </div>
                    <div className="group">
                      <label htmlFor="patientNumber">Patient Telephone Number</label>
                      <Field type="text" id="patientNumber" name="patientNumber" />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="patientAddress">Patient Address</label>
                    <Field type="text" id="patientAddress" name="patientAddress" />
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
