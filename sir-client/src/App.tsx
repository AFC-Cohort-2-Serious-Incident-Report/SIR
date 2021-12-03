import React, { useState } from 'react';
import './Styles/Styles.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import SirForm from './SirForm/SirForm';
import NavBar from './NavBar/NavBar';
import ResponderView from './ResponderView/ResponderView';
import CustomAlert, { AlertType } from './Components/CustomAlert';
import IncidentDetailView from './IncidentDetailView/IncidentDetailView';

const App: React.FC = () => (
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
