import axios from 'axios';

const IncidentServices = {
  defaultParams: {
    size: 5,
    page: 0,
    sort: 'incidentDate,DESC',
  },
  endpointUrl: '/api/incidents',
  getIncidents: (params?: any) => axios.get(IncidentServices.endpointUrl, {
    params: {
      ...IncidentServices.defaultParams,
      params,
    },
  }),
};

export default IncidentServices;
