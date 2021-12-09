import {
  ReactElement, useEffect, useState,
} from 'react';
import { Form, Formik } from 'formik';
import { AxiosResponse } from 'axios';
import CustomModal from '../Components/CustomModal';
import { getIncidentByID, Incident } from '../API';
import IncidentFieldsValidationSchema from '../IncidentFields/IncidentFieldsValidationSchema';
import IncidentFields from '../IncidentFields/IncidentFields';

type IncidentDetailViewProps = {
  id: number;
  onClose: () => void;
  onErrorClose: () => void;
  onSubmitUpdate: (updatedIncident: Incident) => void;
}

const IncidentDetailView = ({
  id,
  onClose,
  onErrorClose,
  onSubmitUpdate,
}: IncidentDetailViewProps): ReactElement => {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    getIncidentByID(id).then((results: any) => {
      if (isMounted) setIncident(results);
    })
      .catch((error) => onErrorClose());
    return () => setIsMounted(false);
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
                modalContent={<IncidentFields setFieldValue={setFieldValue} />}
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
