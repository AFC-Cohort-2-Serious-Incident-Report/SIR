import axios, { AxiosResponse } from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';

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
    id?: number;
    incidentDate: string;
    incidentTime: string;
    incidentLocation: string;
    eventType: string;
    harmOrPotentialHarm: boolean;
    individualsInvolved: Individual;
    typeOfEvent: string[];
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

type PageableData = {
    page: number,
    size: number,
    sort: string
}

// Shouldn't be needed now that pagination is implemented.
// export const getAllIncidents = () => axios.get(`${API_HOST}/api/incidents`);

export const getIncidents = (params?: PageableData): Promise<AxiosResponse> => axios.get(
  `${API_HOST}/api/incidents`,
  {
    params: {
      size: 10,
      page: 0,
      sort: 'incidentDate,DESC',
      ...params,
    },
  },
);

export const getIncidentByID = async (id: number): Promise<Incident> => {
  const response = await axios.get(`${API_HOST}/api/incidents/${id}`);
  return response.data;
};

export const updateIncidentByID = (updatedIncident: Incident):
    Promise<AxiosResponse> => axios.patch(
  `${API_HOST}/api/incidents/${updatedIncident.id}`,
  updatedIncident,
);
