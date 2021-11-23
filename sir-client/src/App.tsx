import React from 'react';
import './App.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import SirForm from './SirForm/SirForm';
import NavBar from './NavBar/NavBar';

const App: React.FC = function App() {
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
              </div>
              )}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
