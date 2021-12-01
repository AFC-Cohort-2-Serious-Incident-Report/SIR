import { FC, ReactElement, useState } from 'react';
import CustomModal from '../Components/CustomModal';
import SirForm from '../SirForm/SirForm';

export type Individual = {
    patient: boolean,
    familyMember: boolean,
    adult: boolean,
    child: boolean,
    staffMember: boolean,
    visitor: boolean,
    volunteer: boolean,
    other: boolean
}

export type Patient = {
    patientName: string,
    patientSocial: string,
    patientPhone: string,
    patientAddress: string,
}

export type Incident = {
    incidentDate: string;
    incidentTime: string;
    incidentLocation: string;
    eventType: string;
    harmOrPotentialHarm: boolean;
    individualsInvolved: Individual;
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
    patientInfo: Patient;
}

type IncidentDetailViewProps = {
    id: number;
}

const IncidentDetailView: FC<IncidentDetailViewProps> = ({ id }: IncidentDetailViewProps) => {
  const [incident, setIncident] = useState<Incident | null>(null);
  return (
    <CustomModal
      onModalClose={() => undefined}
      onModalSubmit={{
        onSubmit: () => undefined,
        text: 'SAVE',
      }}
      modalTitle="Incident Report"
      // TODO : Replace empty div with loading indicator
      modalContent={incident ? <SirForm incident={incident} /> : <div />}
    />
  );
};

export default IncidentDetailView;
