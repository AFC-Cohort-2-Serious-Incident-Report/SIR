const SplashScreen: React.FC = () => (
  <div className="splash">
    <div className="circle" />
    <div className="circle-2" />
    <div className="logo" />
    <div className="left">
      <span>
        A
        <b>serious</b>
        incident report.
      </span>
      <div className="controls">
        <a href="/reporter">Submit a Report</a>
        <a href="/responder">View Reports</a>
      </div>
      <span className="credits">
        Made with
        <i className="gg-heart" />
        by Team SIR
      </span>
    </div>
    <div className="right">
      <ul className="circles">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </div>
  </div>
);

export default SplashScreen;
