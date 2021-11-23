import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Styles.css';
import SWFlogo from '../SWFlogo.png';

type NavBarProps = {
    isResponder: boolean
}

const NavBar = function ({ isResponder }: NavBarProps): ReactElement {
  return (
    <div className="navbar">
      <div className="logo" />
      <div className="links">
        <Link to="/reporter" className={isResponder ? 'unfocused' : 'focused'}>Reporter</Link>
        <Link to="/responder" className={isResponder ? 'focused' : 'unfocused'}>Responder</Link>
      </div>
    </div>
  );
};

export default NavBar;
