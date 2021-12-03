import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { Simulate } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import CustomAlert, { AlertType } from '../Components/CustomAlert';
import SendToCommand from '../SendToCommand/SendToCommand';
import IncidentServices from '../Services/IncidentServices';
import Pagination from '../Components/Pagination';

type IncidentData = {
    id: number,
    incidentDate: string,
    incidentLocation: string,
    incidentType: string,
    harmOrPotentialHarm: boolean,
    incidentDescription: string,
    eventType: string
}

type PageData = {
  size: number;
  firstPage: boolean;
  lastPage: boolean;
  totalCount: number;
  currentPage: number;
  offset: number;
}

const ResponderView: FC = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([] as IncidentData[]);
  const [showSendToCommandModal, setShowSendToCommandModal] = useState(false);
  const [showSentToCommandBanner, setShowSentToCommandBanner] = useState(false);
  const [selectedSendToCommander, setSelectedSendToCommander] = useState('');

  const selectAllCheckbox = useRef<HTMLInputElement | null>(null);
  const [pageData, setPageData] = useState<PageData>({
    size: 0,
    firstPage: true,
    lastPage: false,
    totalCount: 0,
    currentPage: 0,
    offset: 0,
  });

  useEffect(() => {
    IncidentServices.getIncidents()
      .then((response) => {
        setReports(response.data.content);
        setPageData({
          offset: response.data.pageable.offset,
          size: response.data.size,
          firstPage: response.data.first,
          lastPage: response.data.last,
          totalCount: response.data.totalElements,
          currentPage: response.data.number,
        });
      })
      .then(() => console.log(`Submitted report to ${IncidentServices.endpointUrl}`));
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
  };

  const selectAllChangeHandler = () => {
    if (selectedReports.length > 0) {
      setSelectedReports([]);
    } else {
      setSelectedReports([...reports]);
    }
  };

  const sendButtonHandler = (command: string) => {
    setShowSendToCommandModal(false);
    setSelectedReports([]);
    setShowSentToCommandBanner(true);
    setSelectedSendToCommander(command);
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
    <tr
      key={report.id}
      onClick={() => checkboxOnChangeHandler(report)}
    >
      <td>
        <input
          type="checkbox"
          name="selectRow"
          checked={selectedReports.includes(report)}
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

  const navigatePage = (page?: number, size?: number) => {
    IncidentServices.getIncidents({
      page: page || 0,
      size: size || 5,
    })
      .then((response) => {
        setReports(response.data.content);
        setPageData({
          offset: response.data.pageable.offset,
          size: response.data.size,
          firstPage: response.data.first,
          lastPage: response.data.last,
          totalCount: response.data.totalElements,
          currentPage: response.data.number,
        });
      });
  };

  return (
    <>
      <div className="alert-container">
        {showSentToCommandBanner && (
          <CustomAlert
            onClose={() => setShowSentToCommandBanner(false)}
            alertType={AlertType.SUCCESS}
            text={`Sent to ${selectedSendToCommander}`}
          />
        )}
      </div>
      <div className="responder-view">
        <div className="table-left-align">
          <h1 style={{ marginBottom: '40px', fontWeight: 'normal' }}>Incident Reports</h1>
          <SendToCommand
            showModal={showSendToCommandModal}
            onSubmit={(command: string) => sendButtonHandler(command)}
            closeModal={() => setShowSendToCommandModal(false)}
          />
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
          <Pagination
            size={pageData.size}
            firstPage={pageData.firstPage}
            lastPage={pageData.lastPage}
            totalCount={pageData.totalCount}
            currentPage={pageData.currentPage}
            offset={pageData.offset}
            navigatePage={navigatePage}
          />
        </div>
      </div>
    </>
  );
};

export default ResponderView;
