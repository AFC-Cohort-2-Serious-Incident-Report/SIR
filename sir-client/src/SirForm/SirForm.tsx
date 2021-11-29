import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import CustomAlert from '../StyledComponents/CustomAlert';

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

  const handleSubmitClick = (values: Values) => {
    axios.post('/api/incidents', values)
      .then(() => setReportSubmitted(true));
  };

  return (
    <div className="view-container">
      <div>
        {reportSubmitted
          ? 'Incident Report Submitted' : null}
      </div>
      <h2>Incident Report Form</h2>
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
