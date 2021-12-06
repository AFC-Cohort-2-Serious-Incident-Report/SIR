import React from 'react';
import './Styles/Styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import ResponderView from './ResponderView/ResponderView';
import ReporterView from './Views/ReporterView';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReporterView />} />
        <Route path="/reporter" element={<ReporterView />} />
        {/* TODO: Refactor responder into ResponderView like ReporterView. */}
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
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
