import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import IncidentDetailView from '../IncidentDetailView/IncidentDetailView';
import { getAllIncidents, Incident, updateIncidentByID } from '../API';

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
  const [focusedID, setFocusedID] = useState<number | null>(null);

  // Set the back end address and port from environment variable REACT_APP_API_HOST if it is set,
  // otherwise, use the proxy settings in package.json.
  // Example value: REACT_APP_API_HOST="http://3.134.135.195:3001"
  const API_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : '';

  const updateTable = () => {
    getAllIncidents()
      .then((response) => setReports(response.data))
      .then(() => console.log(`Submitted report to ${API_HOST}/api/incidents`));
  };

  useEffect(() => {
    updateTable();
    return () => setReports([]);
  }, []);

  const handleDetailViewClose = () => setFocusedID(null);

  const handleDetailViewSubmit = (updatedIncident: Incident) => {
    updateIncidentByID(updatedIncident)
      .then(() => {
        setFocusedID(null);
        updateTable();
      })
      .catch();
  };

  const renderIncidentRows = reports.map((report: IncidentData) => (
    <tr key={report.id}>
      <td><input type="checkbox" name="selectRow" /></td>
      <td data-testid="incident-date">{report.incidentDate}</td>
      <td data-testid="incident-location">{report.incidentLocation}</td>
      {/* <td>{report.incidentDescription}</td> */}
      <td data-testid="potential-harm">{report.harmOrPotentialHarm ? 'Yes' : 'No'}</td>
      {/* <td>{report.incidentDescription}</td> */}
      <td data-testid="event-type">{report.eventType}</td>
      <td>
        <button type="button" onClick={() => setFocusedID(report.id)}>View</button>
      </td>
    </tr>
  ));

  return (
    <>
      {focusedID && (
        <IncidentDetailView
                    // todo change 1 to passed id
          id={1}
          onClose={handleDetailViewClose}
          onSubmit={handleDetailViewSubmit}
        />
      )}
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
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {renderIncidentRows}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ResponderView;
