import {
  FC, ReactElement, useEffect, useState,
} from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import CustomModal from '../Components/CustomModal';
import { getIncidentByID, Incident } from '../API';
import IncidentFieldsValidationSchema from '../IncidentFields/IncidentFieldsValidationSchema';
import IncidentFields from '../IncidentFields/IncidentFields';

type IncidentDetailViewProps = {
  id: number;
  onClose: () => void;
  onSubmitUpdate: (updatedIncident: Incident) => void;
}

const IncidentDetailView = ({
  id,
  onClose,
  onSubmitUpdate,
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
        onSubmit={onSubmitUpdate}
      >
        {(formik) => {
          const { setFieldValue, handleSubmit } = formik;
          return (
            <Form>
              <CustomModal
                onModalClose={onClose}
                onModalSubmit={{ onSubmit: handleSubmit, text: 'SAVE' }}
                modalTitle="Incident Report"
                // TODO : Replace empty div with loading indicator
                modalContent={(
                  <IncidentFields
                    setFieldValue={setFieldValue}
                    typeOfEvent={incident.typeOfEvent}
                  />
)}
              />
            </Form>
          );
        }}
      </Formik>
      )}
    </div>

  );
};

export default IncidentDetailView;
