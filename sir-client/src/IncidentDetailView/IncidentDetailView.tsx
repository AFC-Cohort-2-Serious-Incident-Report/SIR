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

const makeCancelable = (promise: Promise<Incident>) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      // eslint-disable-next-line prefer-promise-reject-errors
      (val) => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      // eslint-disable-next-line prefer-promise-reject-errors
      (error) => (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};

const IncidentDetailView = ({
  id,
  onClose,
  onErrorClose,
  onSubmitUpdate,
}: IncidentDetailViewProps): ReactElement => {
  const [incident, setIncident] = useState<Incident | null>(null);
  let axiosGetPromise;

  useEffect(() => {
    axiosGetPromise = makeCancelable(getIncidentByID(id));
    axiosGetPromise.promise.then((results: any) => {
      setIncident(results);
    })
      .catch(() => onErrorClose());
    return axiosGetPromise.cancel;
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
