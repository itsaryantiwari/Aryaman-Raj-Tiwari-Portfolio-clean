import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hola! I'm</h2>
            <h1>
              Aryaman
              <br />
              <span>Raj Tiwari</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Full Time</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Data</div>
              <div className="landing-h2-2">Data</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Analyst</div>
              <div className="landing-h2-info-1">Analyst</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
