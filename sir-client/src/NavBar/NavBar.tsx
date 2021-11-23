import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export enum FocusLink {
    REPORTER,
    RESPONDER
}

type NavBarProps = {
    focusLink: FocusLink
}

const NavBar = function ({ focusLink }: NavBarProps): ReactElement {
  return (focusLink === FocusLink.RESPONDER) ? (
    <Link to="/reporter">Reporter</Link>
  ) : (
    <Link to="/responder">Responder</Link>
  );
};

export default NavBar;
