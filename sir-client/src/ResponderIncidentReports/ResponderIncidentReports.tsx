import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import CustomAlert, { AlertType } from '../Components/CustomAlert';
import SendToCommand from '../SendToCommand/SendToCommand';
import Pagination from '../Components/Pagination';
import IncidentDetailView from '../IncidentDetailView/IncidentDetailView';
import {
  Incident,
  updateIncidentByID,
  getIncidents, Individual, searchIncidents,
} from '../API';

type IncidentData = {
  id: number,
  incidentDate: string,
  incidentLocation: string,
  harmOrPotentialHarm: boolean,
  incidentDescription: string,
  eventType: string,
  individualsInvolved: Individual,
  typeOfEvent: string[]
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
  const [showUpdatedIncidentBanner, setShowUpdatedIncidentBanner] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
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
      })
      .catch(() => undefined);
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
    if (selectedReports.find((selectedReport) => selectedReport.id === report.id)) {
      newSelectReports = selectedReports.filter((current) => report.id !== current.id);
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
      page: page || 0,
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
      })
      .catch(() => undefined);
  };

  const handleDetailViewClose = () => setFocusedID(null);

  const handleDetailErrorClose = () => {
    setFocusedID(null);
    setShowErrorMessage(true);
  };

  const handleDetailViewSubmit = (updatedIncident: Incident) => {
    updateIncidentByID(updatedIncident)
      .then(() => {
        setFocusedID(null);
        setShowUpdatedIncidentBanner(true);
        updateTable();
      })
      .catch(() => undefined);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    searchIncidents(e.currentTarget.value, {
      page: 0,
      size: pageData.size,
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

  function handleIndividualsInvolved(report: IncidentData) {
    if (report.individualsInvolved === null) return null;
    let count = 0;
    let firstTrueValue = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(report.individualsInvolved)) {
      if (count === 0) {
        if (value === true) {
          firstTrueValue = key;
          count += 1;
        }
      } else if (value === true) {
        count += 1;
      }
    }
    if (firstTrueValue === 'familyMember') { firstTrueValue = 'family Member'; }
    if (firstTrueValue === 'staffMember') { firstTrueValue = 'staff Member'; }
    firstTrueValue = firstTrueValue.charAt(0).toUpperCase() + firstTrueValue.slice(1);
    if (count <= 1) { return firstTrueValue; }
    return `${firstTrueValue}, +${count - 1}`;
  }

  const handleTypeOfEvent = (typeOfEvent: string[]) => {
    if (typeOfEvent.length === 0) return '';

    let output = typeOfEvent[0];

    if (typeOfEvent.length > 1) {
      output += `, +${typeOfEvent.length - 1}`;
    }

    return output;
  };

  const renderIncidentRows = reports.map((report: IncidentData) => (
    <tr
      key={report.id}
      onClick={() => checkboxOnChangeHandler(report)}
    >
      <td>
        <input
          type="checkbox"
          name="selectRow"
          data-testid={`select-row-${report.id}`}
          checked={!!selectedReports.find((selectedReport) => selectedReport.id === report.id)}
          onChange={() => checkboxOnChangeHandler(report)}
        />
      </td>
      {/* THE TEST ID HERE REFERS TO COLUMN ON FIGMA, the data pulled is corresponds to data */}
      <td data-testid="incident-date">{report.incidentDate}</td>
      <td data-testid="incident-location">{report.incidentLocation}</td>
      <td data-testid="incident-type">{report.eventType}</td>
      <td data-testid="potential-harm">{report.harmOrPotentialHarm ? 'Yes' : 'No'}</td>
      <td data-testid="individuals-involved">{handleIndividualsInvolved(report)}</td>
      <td data-testid="event-type">{handleTypeOfEvent(report.typeOfEvent)}</td>
      <td>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFocusedID(report.id);
          }}
        >
          View
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="view-container">
      <div className="alert-container">
        {showErrorMessage && (
          <CustomAlert
            onClose={() => setShowErrorMessage(false)}
            alertType={AlertType.ERROR}
            text="Error Occurred While Retrieving Incident"
          />
        )}
        {showSentToCommandBanner && (
          <CustomAlert
            onClose={() => setShowSentToCommandBanner(false)}
            alertType={AlertType.SUCCESS}
            text={`Sent to ${selectedSendToCommander}`}
          />
        )}
        {showUpdatedIncidentBanner && (
        <CustomAlert
          onClose={() => setShowUpdatedIncidentBanner(false)}
          alertType={AlertType.SUCCESS}
          text="Incident Successfully Updated"
        />
        )}

      </div>
      {focusedID && (
        <IncidentDetailView
          id={focusedID}
          onClose={handleDetailViewClose}
          onErrorClose={handleDetailErrorClose}
          onSubmitUpdate={handleDetailViewSubmit}
        />
      )}
      <div className="responder-view">
        <div className="table-left-align">
          <h2>Incident Reports</h2>
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
              : (
                <div className="reports-bar">
                  <h3>Reports</h3>
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Search by location..."
                      spellCheck="false"
                      name="search"
                      data-testid="search-input"
                      onKeyUp={(e) => handleSearch(e)}
                    />
                    <i className="gg-search" />
                  </div>
                </div>
              )}
          </div>
          <table>
            <thead>
              <tr>
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
                <th>Incident Type</th>
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
