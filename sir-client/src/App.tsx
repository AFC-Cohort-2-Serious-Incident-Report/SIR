import React from 'react';
import './Styles/Styles.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import SirForm from './SirForm/SirForm';
import NavBar from './NavBar/NavBar';

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
                <h2>Incident Reports</h2>
              </div>
            </div>
              )}
        />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
