import * as Yup from 'yup';

const IncidentFieldsValidationSchema = Yup.object().shape({
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
  // TODO: how to validate this?
  // typeOfEvent: Yup.array().of(Yup.string()).required('Required'),
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

export default IncidentFieldsValidationSchema;
