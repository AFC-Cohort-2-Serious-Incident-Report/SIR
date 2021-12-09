import * as Yup from 'yup';

const IncidentFieldsValidationSchema = Yup.object().shape({
  incidentDate: Yup.string().required('Required'),
  incidentTime: Yup.string().required('Required'),
  incidentLocation: Yup.string().notRequired(),
  eventType: Yup.string().required('Required'),
  harmOrPotentialHarm: Yup.boolean().required('Required'),
  individualsInvolved: Yup.object().shape({
    patient: Yup.boolean(),
    familyMember: Yup.boolean().oneOf([Yup.ref('adult'), Yup.ref('child')], 'Required'),
    adult: Yup.boolean(),
    child: Yup.boolean(),
    staffMember: Yup.boolean(),
    visitor: Yup.boolean(),
    volunteer: Yup.boolean(),
    other: Yup.boolean(),
  }),
  typeOfEvent: Yup.array().of(Yup.string()).required('Required'),
  effectOnIndividual: Yup.string().required('Required'),
  witnessOneName: Yup.string().notRequired(),
  witnessOnePhone: Yup.string().notRequired(),
  witnessTwoName: Yup.string().notRequired(),
  witnessTwoPhone: Yup.string().notRequired(),
  witnessThreeName: Yup.string().notRequired(),
  witnessThreePhone: Yup.string().notRequired(),
  departmentsInvolved: Yup.array().of(Yup.string()).required('Required'),
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
