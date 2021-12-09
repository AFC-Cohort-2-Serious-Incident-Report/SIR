import React, { ReactElement, useState } from 'react';
import { Field } from 'formik';

type IncidentFieldProps = {
  setFieldValue: (field: string, newValue: boolean) => void
}

const IncidentFields = ({ setFieldValue }: IncidentFieldProps): ReactElement => {
  const [familyMemberCheck, setFamilyMemberCheck] = useState(false);

  const handleFamilyMemberCheck = () => {
    setFamilyMemberCheck(!familyMemberCheck);
  };

  const handleFamilyMemberClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFamilyMemberCheck();
    if (e.target.value) {
      setFieldValue('individualsInvolved.adult', false);
      setFieldValue('individualsInvolved.child', false);
    }
  };

  return (
    <>
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
          <label htmlFor="eventType">Incident Type</label>
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
              onClick={handleFamilyMemberClick}
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
        <label htmlFor="typeOfEvent">Event Type</label>
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
    </>
  );
};

export default IncidentFields;
