import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import axios from 'axios';
import { Simulate } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
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
  const [showSendToCommandModal, setShowSendToCommandModal] = useState(false);
  const selectAllCheckbox = useRef<HTMLInputElement | null>(null);

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

  const selectAllChangeHandler = () => {
    if (selectedReports.length > 0) {
      setSelectedReports([]);
    } else {
      setSelectedReports([...reports]);
    }
  };

  useEffect(() => {
    const currentSelectAllCheckbox = selectAllCheckbox.current as HTMLInputElement;
    if (selectedReports.length > 0 && selectedReports.length < reports.length) {
      currentSelectAllCheckbox.indeterminate = true;
    } else {
      currentSelectAllCheckbox.indeterminate = false;
    }
  }, [selectedReports]);

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
    <div className="responder-view">
      <div className="table-left-align">
        <h1 style={{ marginBottom: '40px', fontWeight: 'normal' }}>Incident Reports</h1>
        {showSendToCommandModal
          && (
          <div>
            <SendToCommand
              onSubmit={() => setShowSendToCommandModal(false)}
            />
          </div>
          )}
        <div>
          {(selectedReports.length > 0) ? (
            <div className="reports-selected-bar">
              <div className="reports-selected-text">
                {selectedReports.length}
                {' '}
                selected
              </div>
              <button
                className="send-button"
                type="button"
                onClick={() => setShowSendToCommandModal(true)}
              >
                Send up to command
              </button>
            </div>
          )
            : <h3>Reports</h3>}
        </div>
        <table>
          <thead>
            <tr>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th>
                <input
                  type="checkbox"
                  name="selectAll"
                  checked={(selectedReports.length > 0)}
                  onChange={() => selectAllChangeHandler()}
                  ref={selectAllCheckbox}
                />
              </th>
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
