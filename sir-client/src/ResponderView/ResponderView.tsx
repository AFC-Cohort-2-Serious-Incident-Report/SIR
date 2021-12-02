import { useEffect, useState } from 'react';
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

// private Individuals individualsInvolved;

type PageData = {
  pages: number;
  size: number;
  firstPage: boolean;
  lastPage: boolean;
  totalCount: number;
  currentPage: number;
  offset: number;
}

const ResponderView = () => {
  const [reports, setReports] = useState([]);
  const [pageData, setPageData] = useState<PageData>({
    pages: 0,
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
          pages: response.data.totalPages,
          offset: response.data.pageable.offset,
          size: response.data.size,
          firstPage: response.data.first,
          lastPage: response.data.last,
          totalCount: response.data.totalElements,
          currentPage: response.data.number,
        });
      });
    return () => setReports([]);
  }, []);

  const renderIncidentRow = reports.map((report: IncidentData) => (
    <tr key={report.id}>
      <td><input type="checkbox" name="selectRow" /></td>
      <td>{report.incidentDate}</td>
      <td>{report.incidentLocation}</td>
      <td>{report.incidentDescription}</td>
      <td>{report.harmOrPotentialHarm ? 'Yes' : 'No'}</td>
      <td>{report.incidentDescription}</td>
      <td>{report.eventType}</td>
      <td>View</td>
    </tr>
  ));

  const navigatePage = (page: number) => {
    IncidentServices.getIncidents({
      page,
    })
      .then((response) => {
        setReports(response.data.content);
        setPageData({
          pages: response.data.totalPages,
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
              <th>Incident Type</th>
              <th>Harm</th>
              <th>Individual(s) Involved</th>
              <th>Event Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {renderIncidentRow}
          </tbody>
        </table>
        <Pagination
          pages={pageData.pages}
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
  );
};

export default ResponderView;
