import React, { useState } from 'react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import CustomAlert, { AlertType } from '../Components/CustomAlert';
import IncidentFields from '../IncidentFields/IncidentFields';
import IncidentFieldsValidationSchema from '../IncidentFields/IncidentFieldsValidationSchema';
import IncidentFieldsInitialValues from '../IncidentFields/IncidentFieldsInitialValues';

interface Values {
    incidentDate: string;
    incidentTime: string;
    incidentLocation: string;
    eventType: string;
    harmOrPotentialHarm: boolean;
    individualsInvolved: {
        patient: boolean,
        familyMember: boolean,
        adult: boolean,
        child: boolean,
        staffMember: boolean,
        visitor: boolean,
        volunteer: boolean,
        other: boolean
    };
    typeOfEvent: string;
    effectOnIndividual: string;
    witnessOneName: string;
    witnessOnePhone: string;
    witnessTwoName: string;
    witnessTwoPhone: string;
    witnessThreeName: string;
    witnessThreePhone: string;
    departmentsInvolved: string;
    incidentDescription: string;
    preventativeAction: string;
    patientInfo: {
        patientName: string,
        patientSocial: string,
        patientPhone: string,
        patientAddress: string,
    };
}

const SirForm: React.FC = () => {
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Set the back end address and port from environment variable REACT_APP_API_HOST if it is set,
  // otherwise, use the proxy settings in package.json.
  // Example value: REACT_APP_API_HOST="http://3.134.135.195:3001"
  const API_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';

  const handleSubmitClick = (values: Values) => {
    console.log(values);
    axios.post(`${API_HOST}/api/incidents`, values)
      .then((result) => console.log(values))
      .then(() => setReportSubmitted(true));
    // .then(() => console.log(`Submitted report to ${API_HOST}/api/incidents`));
  };

  return (
    <>
      <div className="alert-container">
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
              isValid, dirty,
            } = formik;
            return (
              <Form title="sir-form">
                <IncidentFields
                  setFieldValue={(field, newValue) => formik.setFieldValue(field, newValue)}
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
