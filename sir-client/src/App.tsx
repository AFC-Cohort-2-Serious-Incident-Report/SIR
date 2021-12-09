import React from 'react';
import './Styles/Styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResponderView from './Views/ResponderView';
import ReporterView from './Views/ReporterView';
import SplashScreen from './Components/SplashScreen';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/reporter" element={<ReporterView />} />
        <Route path="/responder" element={<ResponderView />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
