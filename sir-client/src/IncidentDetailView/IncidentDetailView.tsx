import { FC, useEffect, useState } from 'react';
import CustomModal from '../Components/CustomModal';
import SirForm from '../SirForm/SirForm';
import { getIncidentByID, Incident } from '../API';

type IncidentDetailViewProps = {
    id: number;
}

const IncidentDetailView: FC<IncidentDetailViewProps> = ({ id }: IncidentDetailViewProps) => {
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    getIncidentByID(id)
      .then((results) => setIncident(results))
      .catch();

    return () => setIncident(null);
  }, []);

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
