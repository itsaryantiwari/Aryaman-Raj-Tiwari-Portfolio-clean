import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

let smootherInstance: ScrollSmoother | null = null;

export const getScrollSmoother = () => smootherInstance;

const Navbar = () => {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smootherInstance = smoother;

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      smoother.kill();
      smootherInstance = null;
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src="/images/logo.webp" alt="Aryaman Raj Tiwari" className="navbar-logo" />
        </a>
        <a
          href="mailto:connect@aryamanrajtiwari.in"
          className="navbar-connect"
          data-cursor="disable"
        >
          connect@aryamanrajtiwari.in
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about" title="ABOUT">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" title="WORK">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" title="CONTACT">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
