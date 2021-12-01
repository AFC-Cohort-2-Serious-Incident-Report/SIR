import React, { useState } from 'react';
import './Styles/Styles.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import SirForm from './SirForm/SirForm';
import NavBar from './NavBar/NavBar';
import ResponderView from './ResponderView/ResponderView';
import CustomAlert, { AlertType } from './Components/CustomAlert';
import fakeData from './sir_test_data.json';
import IncidentDetailView from './IncidentDetailView/IncidentDetailView';

const App: React.FC = () => {
  const [showSentToCommand, setShowSentToCommand] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <div>
                <header><NavBar isResponder={false} /></header>
                <SirForm />
              </div>
                    )}
          />
          <Route
            path="/reporter"
            element={(
              <div>
                <header><NavBar isResponder={false} /></header>
                <SirForm />
              </div>
                    )}
          />
          <Route
            path="/responder"
            element={(
              <div>
                <header><NavBar isResponder /></header>
                <div className="view-container">
                  <div className="alert-container">
                    {showSentToCommand && (
                      <CustomAlert
                        onClose={() => setShowSentToCommand(false)}
                        alertType={AlertType.SUCCESS}
                        text="Sent to Commander"
                      />
                    )}
                  </div>
                  <ResponderView />
                </div>
              </div>
                    )}
          />
          <Route
            path="/edit"
            element={<IncidentDetailView id={1} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
