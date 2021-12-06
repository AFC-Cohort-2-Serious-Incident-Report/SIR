import { FC, ReactElement } from 'react';
import NavBar from '../NavBar/NavBar';
import SirForm from '../SirForm/SirForm';

const ReporterView: FC = ():ReactElement => (
  <div>
    <header><NavBar isResponder={false} /></header>
    <SirForm />
  </div>
);

export default ReporterView;
