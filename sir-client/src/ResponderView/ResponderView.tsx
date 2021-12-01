import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import CustomAlert, { AlertType } from '../Components/CustomAlert';
import SendToCommand from '../SendToCommand/SendToCommand';

interface IncidentData {
    id: number,
    incidentDate: string,
    incidentLocation: string,
    incidentType: string,
    harmOrPotentialHarm: boolean,
    incidentDescription: string,
    eventType: string
}

const ResponderView: FC = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([] as IncidentData[]);
  // Set the back end address and port from environment variable REACT_APP_API_HOST if it is set,
  // otherwise, use the proxy settings in package.json.
  // Example value: REACT_APP_API_HOST="http://3.134.135.195:3001"
  const API_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';

  useEffect(() => {
    axios.get(`${API_HOST}/api/incidents`)
      .then((response) => setReports(response.data))
      .then(() => console.log(`Submitted report to ${API_HOST}/api/incidents`));
    return () => setReports([]);
  }, []);

  const checkboxOnChangeHandler = async (report: IncidentData) => {
    let newSelectReports: IncidentData[] = [];
    if (selectedReports.includes(report)) {
      newSelectReports = selectedReports.filter((current) => report !== current);
    } else {
      newSelectReports = [...selectedReports, report];
    }
    setSelectedReports(newSelectReports);
  }; // add report to selectReports

  const renderIncidentRow = reports.map((report: IncidentData) => (
    <tr key={report.id}>
      <td>
        <input
          type="checkbox"
          name="selectRow"
          checked={selectedReports.includes(report)}
          onChange={() => checkboxOnChangeHandler(report)}
        />
      </td>
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
    <>
      <div className="alert-container">
        {(selectedReports.length > 0) && (
        <div>
          Send up to command
        </div>
        )}
      </div>
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
    </>
  );
};

export default ResponderView;
