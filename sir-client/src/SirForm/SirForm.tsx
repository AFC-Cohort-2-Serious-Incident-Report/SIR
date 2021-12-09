import React, { useState } from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import CustomAlert, { AlertType } from '../Components/CustomAlert';
import IncidentFields from '../IncidentFields/IncidentFields';
import IncidentFieldsValidationSchema from '../IncidentFields/IncidentFieldsValidationSchema';
import IncidentFieldsInitialValues from '../IncidentFields/IncidentFieldsInitialValues';
import { Incident } from '../API';

const SirForm: React.FC = () => {
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [showSubmissionErrorMessage, setShowSubmissionErrorMessage] = useState(false);

  // Set the back end address and port from environment variable REACT_APP_API_HOST if it is set,
  // otherwise, use the proxy settings in package.json.
  // Example value: REACT_APP_API_HOST="http://3.134.135.195:3001"
  const API_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';

  const handleSubmitClick = (values: Incident) => {
    console.log(values);
    axios.post(`${API_HOST}/api/incidents`, values)
      .then(() => setReportSubmitted(true))
      .catch(() => setShowSubmissionErrorMessage(true));
  };

  return (
    <>
      <div className="alert-container">
        {showSubmissionErrorMessage && (
          <CustomAlert
            onClose={() => setShowSubmissionErrorMessage(false)}
            alertType={AlertType.ERROR}
            text="Error Occurred While Submitting the Incident Report"
          />
        )}
        {reportSubmitted && (
          <CustomAlert
            onClose={() => setReportSubmitted(false)}
            alertType={AlertType.SUCCESS}
            text="Incident Report Submitted"
          />
        )}
      </div>
      <div className="container">
        <h2>Incident Report Form</h2>
        <Formik
          initialValues={IncidentFieldsInitialValues}
          validationSchema={IncidentFieldsValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmitClick(values);
            resetForm();
          }}
        >
          {(formik) => {
            const {
              isValid, dirty, values,
            } = formik;
            return (
              <Form title="sir-form">
                <IncidentFields
                  setFieldValue={(field, newValue) => formik.setFieldValue(field, newValue)}
                  typeOfEvent={values.typeOfEvent}
                  departmentsInvolved={values.departmentsInvolved}
                />
                <div className="group flex">
                  <button
                    type="submit"
                    className="primary right"
                    disabled={!(dirty && isValid)}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

SirForm.defaultProps = {
  incident: undefined,
};

export default SirForm;
