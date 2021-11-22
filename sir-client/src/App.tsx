import React from 'react';
import './App.css';
import {
  BrowserRouter, Link, Routes, Route,
} from 'react-router-dom';
import SirForm from './SirForm/SirForm';

const App: React.FC = function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SirForm />} />
        <Route path="/reporter" element={<SirForm />} />
        <Route
          path="/responder"
          element={
            <Link to="/reporter">Reporter</Link>
}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
