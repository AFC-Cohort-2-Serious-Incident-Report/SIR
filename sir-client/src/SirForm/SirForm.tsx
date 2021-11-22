import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';

interface Values {
    incidentLocation: string;
    incidentDescription: string;
    preventativeAction: string;
}

const SirForm = function SirForm(): ReactElement {
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
          initialValues={{ incidentLocation: '', incidentDescription: '', preventativeAction: '' }}
          onSubmit={(values) => handleSubmitClick(values)}
        >
          <Form>
            <label htmlFor="incidentLocation">Incident Location</label>
            <Field type="text" id="incidentLocation" name="incidentLocation" />
            <label htmlFor="incidentDescription">Incident Description</label>
            <Field type="test" id="incidentDescription" name="incidentDescription" />
            <label htmlFor="preventativeAction">Preventative Action</label>
            <Field type="test" id="preventativeAction" name="preventativeAction" />
            <button
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SirForm;
