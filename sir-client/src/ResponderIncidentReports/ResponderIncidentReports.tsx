import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import CustomAlert, { AlertType } from '../Components/CustomAlert';
import SendToCommand from '../SendToCommand/SendToCommand';
import Pagination from '../Components/Pagination';
import IncidentDetailView from '../IncidentDetailView/IncidentDetailView';
import { getIncidents, Incident, updateIncidentByID } from '../API';

type IncidentData = {
  id: number,
  incidentDate: string,
  incidentLocation: string,
  incidentType: string,
  harmOrPotentialHarm: boolean,
  incidentDescription: string,
  eventType: string,
  individualsInvolved: string
}

type PageData = {
  size: number;
  firstPage: boolean;
  lastPage: boolean;
  totalCount: number;
  currentPage: number;
  offset: number;
}

const ResponderIncidentReports: FC = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([] as IncidentData[]);
  const [showSendToCommandModal, setShowSendToCommandModal] = useState(false);
  const [showSentToCommandBanner, setShowSentToCommandBanner] = useState(false);
  const [showUpdatedIncident, setShowUpdatedIncident] = useState(false);
  const [selectedSendToCommander, setSelectedSendToCommander] = useState('');
  const [sortMethod, setSortMethod] = useState({
    sortBy: 'incidentDate',
    sortDirection: 'desc',
  });

  const selectAllCheckbox = useRef<HTMLInputElement | null>(null);
  const [focusedID, setFocusedID] = useState<number | null>(null);
  const [pageData, setPageData] = useState<PageData>({
    size: 0,
    firstPage: true,
    lastPage: false,
    totalCount: 0,
    currentPage: 0,
    offset: 0,
  });

  const updateTable = () => {
    getIncidents()
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

  useEffect(() => {
    updateTable();
    return () => setReports([]);
  }, []);

  useEffect(() => {
    const currentSelectAllCheckbox = selectAllCheckbox.current as HTMLInputElement;
    if (selectedReports.length > 0 && selectedReports.length < reports.length) {
      currentSelectAllCheckbox.indeterminate = true;
    } else {
      currentSelectAllCheckbox.indeterminate = false;
    }
  }, [selectedReports]);

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

  const sendButtonHandler = (command: string) => {
    setShowSendToCommandModal(false);
    setSelectedReports([]);
    setShowSentToCommandBanner(true);
    setSelectedSendToCommander(command);
  };

  const navigatePage = (page?: number, size?: number) => {
    getIncidents({
      page: page || pageData.currentPage,
      size: size || pageData.size,
      sort: `${sortMethod.sortBy},${sortMethod.sortDirection}`,
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

  const handleDetailViewClose = () => setFocusedID(null);

  const handleDetailViewSubmit = (updatedIncident: Incident) => {
    updateIncidentByID(updatedIncident)
      .then(() => {
        setFocusedID(null);
        updateTable();
      })
      .catch();
  };

  useEffect(() => {
    const currentSelectAllCheckbox = selectAllCheckbox.current as HTMLInputElement;
    if (selectedReports.length > 0 && selectedReports.length < reports.length) {
      currentSelectAllCheckbox.indeterminate = true;
    } else {
      currentSelectAllCheckbox.indeterminate = false;
    }
  }, [selectedReports]);

  useEffect(() => {
    navigatePage(pageData.currentPage || 0, pageData.size || 10);
  }, [sortMethod]);

  const renderIncidentRows = reports.map((report: IncidentData) => (
    <tr
      key={report.id}
      onClick={() => checkboxOnChangeHandler(report)}
    >
      <td>
        <input
          type="checkbox"
          name="selectRow"
          checked={selectedReports.includes(report)}
          onChange={() => checkboxOnChangeHandler(report)}
        />
      </td>
      <td data-testid="incident-date">{report.incidentDate}</td>
      <td data-testid="incident-location">{report.incidentLocation}</td>
      {/* <td>{report.incidentDescription}</td> */}
      <td data-testid="potential-harm">{report.harmOrPotentialHarm ? 'Yes' : 'No'}</td>
      {/* <td>{report.individualsInvolved}</td> */}
      <td data-testid="event-type">{report.eventType}</td>
      <td>
        <button type="button" onClick={() => setFocusedID(report.id)}>View</button>
      </td>
    </tr>
  ));

  return (
    <div className="view-container">
      <div className="alert-container">
        {showSentToCommandBanner && (
          <CustomAlert
            onClose={() => setShowSentToCommandBanner(false)}
            alertType={AlertType.SUCCESS}
            text={`Sent to ${selectedSendToCommander}`}
          />
        )}

      </div>
      {focusedID && (
        <IncidentDetailView
                    // todo change 1 to passed id
          id={focusedID}
          onClose={handleDetailViewClose}
          onSubmitUpdate={handleDetailViewSubmit}
        />
      )}
      <div className="responder-view">
        <div className="table-left-align">
          <h1 style={{ marginBottom: '40px', fontWeight: 'normal' }}>Incident Reports</h1>
          {showSendToCommandModal
                    && (
                    <SendToCommand
                      onSubmit={(command: string) => sendButtonHandler(command)}
                      closeModal={() => setShowSendToCommandModal(false)}
                    />
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
                <th
                  onClick={() => {
                    setSortMethod({
                      sortBy: 'incidentDate',
                      sortDirection: sortMethod.sortDirection === 'desc' ? 'asc' : 'desc',
                    });
                  }}
                >
                  Event Date
                  {
                    (sortMethod.sortBy === 'incidentDate')
                      ? (
                        <i className={sortMethod.sortDirection === 'asc' ? 'gg-chevron-up' : 'gg-chevron-down'} />
                      )
                      : null
                  }
                </th>
                <th>Location</th>
                {/* <th>Incident Type</th> */}
                <th>Harm</th>
                <th>Individual(s) Involved</th>
                <th>Event Type</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {renderIncidentRows}
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
    </div>
  );
};

export default ResponderIncidentReports;