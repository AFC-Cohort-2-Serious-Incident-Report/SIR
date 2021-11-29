import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

interface Values {
    incidentDate: string;
    incidentTime: string;
    eventType: string;
    harmOrPotentialHarm: boolean,
    incidentLocation: string;
    incidentDescription: string;
    preventativeAction: string;
}

const incidentSchema = Yup.object().shape({
  incidentDate: Yup.string()
    .required('Required'),
  incidentTime: Yup.string()
    .required('Required'),
  eventType: Yup.string()
    .required('Required'),
  harmOrPotentialHarm: Yup.boolean()
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

  // Set the back end address and port from environment variable REACT_APP_API_HOST if it is set,
  // otherwise, use the proxy settings in package.json.
  // Example value: REACT_APP_API_HOST="http://3.134.135.195:3001"
  const API_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';

  const handleSubmitClick = (values: Values) => {
    axios.post(`${API_HOST}/api/incidents`, values)
      .then(() => setReportSubmitted(true))
      .then(() => console.log(`Submitted report to ${API_HOST}/api/incidents`));
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
            eventType: '',
            harmOrPotentialHarm: false,
            incidentLocation: '',
            incidentDescription: '',
            preventativeAction: '',
          }}
          validationSchema={incidentSchema}
          onSubmit={handleSubmitClick}
        >
          {(formik) => {
            const {
              isValid, dirty,
            } = formik;
            return (
              <Form>
                <label htmlFor="incidentDate">Date of Event</label>
                <Field type="date" id="incidentDate" name="incidentDate" />
                <label htmlFor="incidentTime">Time of Event</label>
                <Field type="time" id="incidentTime" name="incidentTime" />
                <label htmlFor="eventType">Event Type</label>
                <Field type="select" as="select" id="eventType" name="eventType">
                  <option value="Actual Event">Actual Event / Incident</option>
                  <option value="Not Actual Event">Not Actual Event / Incident</option>
                  <option value="Training Event">Training Event / Not Real</option>
                </Field>
                <label htmlFor="harmOrPotentialHarm">Harm or Potential Harm</label>
                <Field type="select" as="select" id="harmOrPotentialHarm" name="harmOrPotentialHarm">
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Field>
                <label htmlFor="incidentLocation">Incident Location</label>
                <Field type="text" id="incidentLocation" name="incidentLocation" />
                <label htmlFor="incidentDescription">Incident Description</label>
                <Field type="text" as="textarea" id="incidentDescription" name="incidentDescription" />
                <label htmlFor="preventativeAction">Preventative Action</label>
                <Field type="text" as="textarea" id="preventativeAction" name="preventativeAction" />
                <button
                  type="submit"
                  className="primary"
                  disabled={!(dirty && isValid)}
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SirForm;
