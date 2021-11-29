import { useEffect, useState } from 'react';
import axios from 'axios';

interface IncidentData {
    id: number,
    incidentDate: string,
    incidentLocation: string,
    harmOrPotentialHarm: boolean,
    eventType: string
}

const ResponderView = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    axios.get('/api/incidents')
      .then((response) => setReports(response.data));
    return () => setReports([]);
  }, []);

  const renderIncidentRow = reports.map((report: IncidentData) => (
    <div key={report.id}>
      <div>{report.incidentDate}</div>
      <div>{report.incidentLocation}</div>
      <div>{report.harmOrPotentialHarm ? 'Yes' : 'No'}</div>
      <div>{report.eventType}</div>
    </div>
  ));

  return (
    <div>
      <h1>Incident Reports</h1>
      <h3>Reports</h3>
      <div>
        <div><input type="checkbox" /></div>
        <div>Event Date</div>
        <div>Location</div>
        {/* <div>Incident Type</div> */}
        <div>Harm</div>
        {/* <div>Individual(s) Involved</div> */}
        <div>Event Type</div>
        <div>Details</div>
      </div>
      {renderIncidentRow}
    </div>
  );
};

export default ResponderView;
