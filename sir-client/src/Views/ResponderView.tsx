import React, { FC, ReactElement } from 'react';
import NavBar from '../NavBar/NavBar';
import ResponderIncidentReports from '../ResponderIncidentReports/ResponderIncidentReports';

const ResponderView: FC = ():ReactElement => (
  <div>
    <header><NavBar isResponder /></header>
    <ResponderIncidentReports />
  </div>
);

export default ResponderView;
