import React, { ReactElement, useState } from 'react';
import axios from 'axios';

const SirForm = function SirForm(): ReactElement {
  const [location, setLocation] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleSubmitClick = () => {
    axios.post('/api/incidents', { location })
      .then(() => setReportSubmitted(true));
  };

  return (
    <div>
      <div>
        {reportSubmitted
          ? 'Incident Report Submitted' : null}
      </div>
      <div>
        <label htmlFor="incident-location">Incident Location</label>
        <input type="text" id="incident-location" onChange={(event) => setLocation(event.target.value)} />
        <button
          type="button"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SirForm;
