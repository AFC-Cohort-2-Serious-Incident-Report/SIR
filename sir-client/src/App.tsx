import React from 'react';
import './App.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import SirForm from './SirForm/SirForm';
import NavBar, { FocusLink } from './NavBar/NavBar';

const App: React.FC = function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <body>
          <Routes>
            <Route
              path="/"
              element={(
                <div>
                  <header><NavBar focusLink={FocusLink.REPORTER} /></header>
                  <SirForm />
                </div>
            )}
            />
            <Route
              path="/reporter"
              element={(
                <div>
                  <header><NavBar focusLink={FocusLink.REPORTER} /></header>
                  <SirForm />
                </div>
                  )}
            />
            <Route
              path="/responder"
              element={(
                <div>
                  <header><NavBar focusLink={FocusLink.RESPONDER} /></header>
                  <div>This is a responder div.</div>
                </div>
              )}
            />
          </Routes>
        </body>
      </BrowserRouter>
    </div>
  );
};

export default App;
