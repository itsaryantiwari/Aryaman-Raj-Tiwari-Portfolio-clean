import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Co-Founder</h4>
                <h5>
                  Sanraksh Foundation (Non-Profit Organisation) — New Delhi,
                  India
                </h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Sanraksh Foundation is a Public-Funded Non-Profit Organisation and
              a subsidiary of the Glimpses of India Group, based in Dwarka, New
              Delhi. The organisation works to protect and preserve both
              domestic animals and wildlife by combining public efforts,
              government initiatives, and people’s movements.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern - Data And Market Intelligence</h4>
                <h5>Mobility Aftermarket Pvt. Ltd. — Bangalore</h5>
              </div>
              <h3>2024-25</h3>
            </div>
            <p>
              Conducted 5+ in-depth market research projects within the
              automobile and mobility sectors, identifying 3 key trends and 2
              potential growth opportunities.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research and Development Intern</h4>
                <h5>
                  Indian Institute of Technology     
                    (IIT Bombay) - Mumbai
                </h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Contributed to the innovative design and fabrication of
              high-precision, sub-micron linear stage for an ultra-high-speed
              micro milling center, also implemented advanced digital
              filtering techniques to enhance real-time chatter detection during
              micro milling.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Summer Intern</h4>
                <h5>IBM India — Bangalore</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Co-created with mock clients on Requirement Traceability Matrix
              for fit-gap analysis, and Mural to consult solution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
