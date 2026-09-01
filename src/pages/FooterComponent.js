import React from "react";
import { NavLink } from "react-router-dom";
import "./../css/footer.css";
import "../js/footer.js";

class Footer extends React.Component {
  state = {
    activeItem: "home",
  };

  handleNavClick = (item) => {
    this.setState({
      activeItem: item,
    });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <nav className="bottom-nav" id="bottomNav">
        <NavLink
          to="/"
          className={`nav-item ${
            activeItem === "home" ? "active" : ""
          }`}
          onClick={() => this.handleNavClick("home")}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <path d="M9 22V12h6v10" />
          </svg>

          <span className="nav-label">خانه</span>
        </NavLink>

        <NavLink
          to="/appointments"
          className={`nav-item ${
            activeItem === "appt" ? "active" : ""
          }`}
          onClick={() => this.handleNavClick("appt")}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>

          <span className="nav-label">نوبت‌ها</span>
        </NavLink>

        <NavLink
          to="/services"
          className={`nav-item ${
            activeItem === "svc" ? "active" : ""
          }`}
          onClick={() => this.handleNavClick("svc")}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 2 9 5-9 5-9-5 9-5Z" />
            <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
          </svg>

          <span className="nav-label">خدمات</span>
        </NavLink>

        <NavLink
          to="/journey"
          className={`nav-item ${
            activeItem === "journey" ? "active" : ""
          }`}
          onClick={() => this.handleNavClick("journey")}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
          </svg>

          <span className="nav-label">سفر من</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={`nav-item ${
            activeItem === "profile" ? "active" : ""
          }`}
          onClick={() => this.handleNavClick("profile")}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>

          <span className="nav-label">پروفایل</span>
        </NavLink>
      </nav>
    );
  }
}

export default Footer;