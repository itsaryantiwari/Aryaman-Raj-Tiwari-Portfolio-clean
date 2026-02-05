import { useLayoutEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useLayoutEffect(() => {
    // Only enable horizontal scroll animation on desktop (> 1024px)
    if (window.innerWidth <= 1024) {
      return; // Skip horizontal scroll on mobile
    }

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        onEnter: () => {
          document.querySelector(".work-section")?.classList.add("work-pinned");
        },
        onLeave: () => {
          document.querySelector(".work-section")?.classList.remove("work-pinned");
        },
        onEnterBack: () => {
          document.querySelector(".work-section")?.classList.add("work-pinned");
        },
        onLeaveBack: () => {
          document.querySelector(".work-section")?.classList.remove("work-pinned");
        },
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up on unmount
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {/* Project 1: */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>UBER Ride Data Analytics - Bangalore City</h4>
                  <p>
                    Visualized and analyzed Uber ride data for Bangalore city
                    using Python and Tableau.
                  </p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>SQL, Python, Tableau, Pandas, NumPy and PowerBI</p>
            </div>
            <WorkImage
              image="/images/placeholder.webp"
              alt="UBER Ride Data Analytics - Bangalore City"
              link="https://github.com/itsaryantiwari/UBER-Data-Analysis-Project"
            />
          </div>

          {/* Project 2: */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>E-Commerce Full Stack Website</h4>
                  <p>
                    This is a full-featured MERN stack (MongoDB, Express, React,
                    Node.js) e-commerce application, fully equipped with a
                    Stripe payment gateway, authentication system, and admin
                    product management. The project is built to simulate a
                    real-world online store, optimised for performance and
                    scalability.
                  </p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>
                JavaScript, React Native, GSAP, Framer Motion, Three.js,
                Tailwind
              </p>
            </div>
            <WorkImage
              image="/images/placeholder.webp"
              alt="E-Commerce Full Stack Website"
              link="https://github.com/itsaryantiwari/E-Commerce-FS-Web"
            />
          </div>

          {/* Project 3: */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>AI Notes App</h4>
                  <p>
                    This cool app helps you take and manage notes with a little
                    touch of AI magic. Whether you're a student, a pro, or just
                    someone who likes jotting things down, this app's got your
                    back.
                  </p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Next.js, JavaScript, React, Tailwind</p>
            </div>
            <WorkImage
              image="/images/placeholder.webp"
              alt="AI Notes App"
              link="https://github.com/itsaryantiwari/react-notes-app-main"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
