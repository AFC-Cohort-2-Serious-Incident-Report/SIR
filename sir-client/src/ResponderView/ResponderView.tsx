import { useEffect, useState } from 'react';
import axios from 'axios';

interface IncidentData {
    id: number,
    incidentDate: string,
    incidentLocation: string,
    incidentType: string,
    harmOrPotentialHarm: boolean,
    incidentDescription: string,
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
    <tr key={report.id}>
      <td><input type="checkbox" name="selectRow" /></td>
      <td>{report.incidentDate}</td>
      <td>{report.incidentLocation}</td>
      {/* <td>{report.incidentDescription}</td> */}
      <td>{report.harmOrPotentialHarm ? 'Yes' : 'No'}</td>
      {/* <td>{report.incidentDescription}</td> */}
      <td>{report.eventType}</td>
      {/* <td>View</td> */}
    </tr>
  ));

  return (
    <div className="responder-view">
      <div className="table-left-align">
        <h1 style={{ marginBottom: '40px', fontWeight: 'normal' }}>Incident Reports</h1>
        <h3>Reports</h3>
        <table>
          <thead>
            <tr>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th><input type="checkbox" name="selectAll" /></th>
              <th>Event Date</th>
              <th>Location</th>
              {/* <th>Incident Type</th> */}
              <th>Harm</th>
              {/* <th>Individual(s) Involved</th> */}
              <th>Event Type</th>
              {/* <th>Details</th> */}
            </tr>
          </thead>
          <tbody>
            {renderIncidentRow}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default ResponderView;
