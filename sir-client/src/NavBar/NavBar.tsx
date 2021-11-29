import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type NavBarProps = {
    isResponder: boolean
}

const NavBar = ({ isResponder }: NavBarProps): ReactElement => (
  <div className="navbar">
    <div className="logo" data-testid="swfLogo" />
    <div className="links">
      <Link to="/reporter" className={isResponder ? 'unfocused' : 'focused'}>Reporter</Link>
      <Link to="/responder" className={isResponder ? 'focused' : 'unfocused'}>Responder</Link>
    </div>
  </div>
);

export default NavBar;
