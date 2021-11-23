import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

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
