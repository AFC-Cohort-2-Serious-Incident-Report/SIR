import React, { useState } from 'react';
import './Styles/Styles.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import SirForm from './SirForm/SirForm';
import NavBar from './NavBar/NavBar';
import ResponderView from './ResponderView/ResponderView';
import CustomAlert, { AlertType } from './Components/CustomAlert';

const App: React.FC = () => {
  const [showSentToCommand, setShowSentToCommand] = useState(true);

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
