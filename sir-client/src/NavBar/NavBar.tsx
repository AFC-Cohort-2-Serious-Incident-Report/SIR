import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Styles.css';

const NavBar: React.FC = (isResponder) => (
  <div className="navbar">
    <div className="logo" data-testid="swfLogo" />
    <div className="links">
      <Link to="/reporter" className={isResponder ? 'unfocused' : 'focused'}>Reporter</Link>
      <Link to="/responder" className={isResponder ? 'focused' : 'unfocused'}>Responder</Link>
    </div>
  </div>
);

export default NavBar;
