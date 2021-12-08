function convertDate(date: Date): string {
  const today = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate().toString().padStart(2, '0')}`;
  console.log(`Today is: ${today}`);
  return today;
}

const IncidentFieldsInitialValues = {
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
  typeOfEvent: [],
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
};

export default IncidentFieldsInitialValues;
