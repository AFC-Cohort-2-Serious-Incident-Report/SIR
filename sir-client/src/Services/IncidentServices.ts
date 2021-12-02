import axios from 'axios';

const IncidentServices = {
  defaultParams: {
    size: 5,
    page: 0,
    sort: 'incidentDate,DESC',
  },
  endpointUrl: `${process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : ''}/api/incidents`,
  getIncidents: (params?: any) => axios.get(IncidentServices.endpointUrl, {
    params: {
      ...IncidentServices.defaultParams,
      ...params,
    },
  }),
};

export default IncidentServices;
