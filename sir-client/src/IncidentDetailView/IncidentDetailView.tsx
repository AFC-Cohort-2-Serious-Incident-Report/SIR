import {
  FC, ReactElement, useEffect, useState,
} from 'react';
import { Formik, useFormikContext } from 'formik';
import CustomModal from '../Components/CustomModal';
import { getIncidentByID, Incident } from '../API';
import IncidentFieldsValidationSchema from '../IncidentFields/IncidentFieldsValidationSchema';
import IncidentFields from '../IncidentFields/IncidentFields';

type IncidentDetailViewProps = {
  id: number;
  onClose: () => void;
  onSubmit: (updatedIncident: Incident) => void;
}

const IncidentDetailView = ({
  id,
  onClose,
  onSubmit,
}: IncidentDetailViewProps): ReactElement => {
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    getIncidentByID(id)
      .then((results) => setIncident(results))
      .catch();
  }, []);

  return (
    <div>
      {incident && (
      <Formik
        initialValues={incident}
        validationSchema={IncidentFieldsValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {(formik) => {
          const { handleSubmit, setFieldValue } = formik;
          return (
            <CustomModal
              onModalClose={onClose}
              onModalSubmit={{ onSubmit: handleSubmit, text: 'SAVE' }}
              modalTitle="Incident Report"
          // TODO : Replace empty div with loading indicator
              modalContent={<IncidentFields setFieldValue={setFieldValue} />}
            />
          );
        }}
      </Formik>
      )}
    </div>

  );
};

export default IncidentDetailView;
