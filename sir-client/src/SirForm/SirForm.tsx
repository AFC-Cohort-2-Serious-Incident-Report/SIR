import React, { useState } from 'react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomAlert, { AlertType } from '../Components/CustomAlert';
import { Incident } from '../API';

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

const incidentSchema = Yup.object().shape({
  incidentDate: Yup.string().required('Required'),
  incidentTime: Yup.string().required('Required'),
  incidentLocation: Yup.string().notRequired(),
  eventType: Yup.string().required('Required'),
  harmOrPotentialHarm: Yup.boolean().required('Required'),
  individualsInvolved: Yup.object().shape({
    patient: Yup.boolean().notRequired(),
    familyMember: Yup.boolean().notRequired(),
    adult: Yup.boolean().notRequired(),
    child: Yup.boolean().notRequired(),
    staffMember: Yup.boolean().notRequired(),
    visitor: Yup.boolean().notRequired(),
    volunteer: Yup.boolean().notRequired(),
    other: Yup.boolean().notRequired(),
  }),
  typeOfEvent: Yup.string().required('Required'),
  effectOnIndividual: Yup.string().required('Required'),
  witnessOneName: Yup.string().notRequired(),
  witnessOnePhone: Yup.string().notRequired(),
  witnessTwoName: Yup.string().notRequired(),
  witnessTwoPhone: Yup.string().notRequired(),
  witnessThreeName: Yup.string().notRequired(),
  witnessThreePhone: Yup.string().notRequired(),
  departmentsInvolved: Yup.string().required('Required'),
  incidentDescription: Yup.string().required('Required'),
  preventativeAction: Yup.string().required('Required'),
  patientInfo: Yup.object().shape({
    patientName: Yup.string().required('Required'),
    patientSocial: Yup.string().required('Required'),
    patientPhone: Yup.string().required('Required'),
    patientAddress: Yup.string().required('Required'),
  }),
});

export function convertDate(date: Date): string {
  const today = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate().toString().padStart(2, '0')}`;
  console.log(`Today is: ${today}`);
  return today;
}

type SirFormProps = {
    incident?: Incident;
}

const SirForm: React.FC<SirFormProps> = ({ incident }: SirFormProps) => {
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [familyMemberCheck, setFamilyMemberCheck] = useState(false);

  // Set the back end address and port from environment variable REACT_APP_API_HOST if it is set,
  // otherwise, use the proxy settings in package.json.
  // Example value: REACT_APP_API_HOST="http://3.134.135.195:3001"
  const API_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';

  const handleSubmitClick = (values: Values) => {
    axios.post(`${API_HOST}/api/incidents`, values)
      .then(() => setReportSubmitted(true));
    // .then(() => console.log(`Submitted report to ${API_HOST}/api/incidents`));
  };

  const handleFamilyMemberCheck = () => {
    setFamilyMemberCheck(!familyMemberCheck);
  };

  return (
    <>
      {!incident && (
        <div className="alert-container">
          {reportSubmitted && (
          <CustomAlert
            onClose={() => setReportSubmitted(false)}
            alertType={AlertType.SUCCESS}
            text="Incident Report Submitted"
          />
          )}
        </div>
      )}
      <div className="container">
        {!incident && <h2>Incident Report Form</h2>}
        <Formik
          initialValues={incident || {
            incidentDate: convertDate(new Date()),
            incidentTime: '',
            incidentLocation: '',
            eventType: 'Actual Event / Incident',
            harmOrPotentialHarm: false,
            individualsInvolved: {
              patient: false,
              familyMember: false,
              adult: false,
              child: false,
              staffMember: false,
              visitor: false,
              volunteer: false,
              other: false,
            },
            typeOfEvent: '',
            effectOnIndividual: 'No Harm Sustained',
            witnessOneName: '',
            witnessOnePhone: '',
            witnessTwoName: '',
            witnessTwoPhone: '',
            witnessThreeName: '',
            witnessThreePhone: '',
            departmentsInvolved: '',
            incidentDescription: '',
            preventativeAction: '',
            patientInfo: {
              patientName: '',
              patientSocial: '',
              patientPhone: '',
              patientAddress: '',
            },
          }}
          validationSchema={incidentSchema}
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
                      <option value="Actual Event / Incident">Actual Event / Incident</option>
                      <option value="Not Actual Event / Incident">
                        Not Actual Event / Incident
                      </option>
                      <option value="Training Event / Not Real">Training Event / Not Real</option>
                    </Field>
                  </div>
                  <div className="group">
                    <label htmlFor="harmOrPotentialHarm">Harm or Potential Harm</label>
                    <Field
                      type="select"
                      as="select"
                      id="harmOrPotentialHarm"
                      name="harmOrPotentialHarm"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Field>
                  </div>
                </div>
                <label htmlFor="individualsInvolved">Individuals Involved</label>
                <div className="group split">
                  <div className="group">
                    <label htmlFor="individualsInvolved.patient">
                      <Field
                        type="checkbox"
                        className="box"
                        name="individualsInvolved.patient"
                        title="individualsInvolved.patient"
                        id="individualsInvolved.patient"
                      />
                      Patient
                    </label>
                    <label htmlFor="individualsInvolved.familyMember">
                      <Field
                        type="checkbox"
                        className="box"
                        name="individualsInvolved.familyMember"
                        title="individualsInvolved.familyMember"
                        id="individualsInvolved.familyMember"
                        onClick={() => {
                          handleFamilyMemberCheck();
                          if (formik.values.individualsInvolved.familyMember) {
                            formik.setFieldValue('individualsInvolved.adult', false);
                            formik.setFieldValue('individualsInvolved.child', false);
                          }
                        }}
                      />
                      Family Member
                    </label>
                    <label
                      htmlFor="individualsInvolved.adult"
                      data-indent="yes"
                      className={!familyMemberCheck ? 'disabled' : 'label'}
                    >
                      <Field
                        type="checkbox"
                        name="individualsInvolved.adult"
                        title="individualsInvolved.adult"
                        id="individualsInvolved.adult"
                        disabled={!familyMemberCheck}
                        className="box"
                      />
                      Adult
                    </label>
                    <label
                      htmlFor="individualsInvolved.child"
                      data-indent="yes"
                      className={!familyMemberCheck ? 'disabled' : 'p'}
                    >
                      <Field
                        type="checkbox"
                        name="individualsInvolved.child"
                        title="individualsInvolved.child"
                        id="individualsInvolved.child"
                        disabled={!familyMemberCheck}
                        className="box"
                      />
                      Child less than 18 years old
                    </label>
                  </div>
                  <div className="group">
                    <label htmlFor="individualsInvolved.staffMember">
                      <Field
                        type="checkbox"
                        className="box"
                        name="individualsInvolved.staffMember"
                        title="individualsInvolved.staffMember"
                        id="individualsInvolved.staffMember"
                      />
                      Staff Member
                    </label>
                    <label htmlFor="individualsInvolved.visitor">
                      <Field
                        type="checkbox"
                        className="box"
                        name="individualsInvolved.visitor"
                        title="individualsInvolved.visitor"
                        id="individualsInvolved.visitor"
                      />
                      Visitor
                    </label>
                    <label
                      htmlFor="individualsInvolved.volunteer"
                    >
                      <Field
                        type="checkbox"
                        className="box"
                        name="individualsInvolved.volunteer"
                        title="individualsInvolved.volunteer"
                        id="individualsInvolved.volunteer"
                      />
                      Volunteer
                    </label>
                    <label htmlFor="individualsInvolved.other">
                      <Field
                        type="checkbox"
                        className="box"
                        name="individualsInvolved.other"
                        title="individualsInvolved.other"
                        id="individualsInvolved.other"
                      />
                      Other
                    </label>
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="typeOfEvent">Type of Event</label>
                  <Field type="text" id="typeOfEvent" name="typeOfEvent" title="typeOfEvent" />
                </div>
                <div className="group">
                  <label htmlFor="effectOnIndividual">
                    Effect of this incident on the individual(s)
                    involved
                  </label>
                  <Field type="select" as="select" id="effectOnIndividual" name="effectOnIndividual">
                    <option value="No Harm Sustained">Harm Sustained</option>
                    <option value="Harm Sustained">No Harm Sustained</option>
                  </Field>
                </div>
                <div className="group split">
                  <div className="group">
                    <label htmlFor="witnessOneName">Witness Name</label>
                    <Field
                      type="text"
                      id="witnessOneName"
                      name="witnessOneName"
                      title="witnessOneName"
                    />
                    <Field
                      type="text"
                      id="witnessTwoName"
                      name="witnessTwoName"
                      title="witnessTwoName"
                    />
                    <Field
                      type="text"
                      id="witnessThreeName"
                      name="witnessThreeName"
                      title="witnessThreeName"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="witnessOnePhone">Witness Phone</label>
                    <Field
                      type="text"
                      id="witnessOnePhone"
                      name="witnessOnePhone"
                      title="witnessOnePhone"
                    />
                    <Field
                      type="text"
                      id="witnessTwoPhone"
                      name="witnessTwoPhone"
                      title="witnessTwoPhone"
                    />
                    <Field
                      type="text"
                      id="witnessThreePhone"
                      name="witnessThreePhone"
                      title="witnessThreePhone"
                    />
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="departmentsInvolved">Department(s) Involved in this Incident</label>
                  <Field
                    type="text"
                    id="departmentsInvolved"
                    name="departmentsInvolved"
                    title="departmentsInvolved"
                  />
                </div>
                <div className="group">
                  <label htmlFor="incidentDescription">Description of Incident</label>
                  <Field
                    type="text"
                    as="textarea"
                    id="incidentDescription"
                    name="incidentDescription"
                  />
                </div>
                <div className="group">
                  <label htmlFor="preventativeAction">
                    What actions, if any, could have been taken to
                    prevent this incident from occurring?
                  </label>
                  <Field type="text" as="textarea" id="preventativeAction" name="preventativeAction" />
                </div>
                <div className="group">
                  <label htmlFor="patientInfo.patientName">Patient Name or ID Plate</label>
                  <Field
                    type="text"
                    id="patientInfo.patientName"
                    name="patientInfo.patientName"
                    title="patientInfo.patientName"
                  />
                </div>
                <div className="group split">
                  <div className="group">
                    <label htmlFor="patientInfo.patientSocial">Patient SSN</label>
                    <Field
                      type="text"
                      id="patientInfo.patientSocial"
                      name="patientInfo.patientSocial"
                      title="patientInfo.patientSocial"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="patientInfo.patientPhone">Patient Telephone Number</label>
                    <Field
                      type="text"
                      id="patientInfo.patientPhone"
                      name="patientInfo.patientPhone"
                      title="patientInfo.patientPhone"
                    />
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="patientInfo.patientAddress">Patient Address</label>
                  <Field
                    type="text"
                    id="patientInfo.patientAddress"
                    name="patientInfo.patientAddress"
                    title="patientInfo.patientAddress"
                  />
                </div>
                {!incident && (
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
                )}
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
