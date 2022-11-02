/* ----- Sidebar.js ----- */
import React from "react";
import "./Sidebar.scss";

//Packages
import { Link } from "react-router-dom";

//MUI
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import Person4RoundedIcon from "@mui/icons-material/Person4Rounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";

//Utils
import { colors } from "../../utils/Colors.js";

function Sidebar({ page }) {
  const stylesSetColor = (current) => {
    if (page === current) {
      return { color: colors.primary.main };
    } else {
      return { color: colors.grey };
    }
  };
  const stylesSetBackgroundColor = (current) => {
    if (page === current) {
      return { backgroundColor: colors.primary.lighter };
    } else {
      return { backgroundColor: colors.white };
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src="./images/ZenturaHealthLogo.png" alt="" />
      </div>
      {/* Dashboard */}
      <Link to="/dashboard" style={{ textDecoration: "none", width: "100%" }}>
        <div
          className="sidebar__item"
          style={stylesSetBackgroundColor("dashboard")}
        >
          <div className="sidebar__item__icon">
            <GridViewRoundedIcon style={stylesSetColor("dashboard")} />
          </div>
          <div className="sidebar__item__text">
            <p style={stylesSetColor("dashboard")}>Dashboard</p>
          </div>
        </div>
      </Link>
      {/* Patients */}
      <Link to="/patients" style={{ textDecoration: "none", width: "100%" }}>
        <div
          className="sidebar__item"
          style={stylesSetBackgroundColor("patients")}
        >
          <div className="sidebar__item__icon">
            <Person2RoundedIcon style={stylesSetColor("patients")} />
          </div>
          <div className="sidebar__item__text">
            <p style={stylesSetColor("patients")}>Patients</p>
          </div>
        </div>
      </Link>
      {/* Doctors */}
      <Link to="/doctors" style={{ textDecoration: "none", width: "100%" }}>
        <div
          className="sidebar__item"
          style={stylesSetBackgroundColor("doctors")}
        >
          <div className="sidebar__item__icon">
            <Person4RoundedIcon style={stylesSetColor("doctors")} />
          </div>
          <div className="sidebar__item__text">
            <p style={stylesSetColor("doctors")}>Doctors</p>
          </div>
        </div>
      </Link>
      {/* Lab Reports*/}
      <Link to="/labreports" style={{ textDecoration: "none", width: "100%" }}>
        <div
          className="sidebar__item"
          style={stylesSetBackgroundColor("labreports")}
        >
          <div className="sidebar__item__icon">
            <DescriptionRoundedIcon style={stylesSetColor("labreports")} />
          </div>
          <div className="sidebar__item__text">
            <p style={stylesSetColor("labreports")}>Lab Reports</p>
          </div>
        </div>
      </Link>
      {/* Jobs */}
      <Link to="/jobs" style={{ textDecoration: "none", width: "100%" }}>
        <div className="sidebar__item" style={stylesSetBackgroundColor("jobs")}>
          <div className="sidebar__item__icon">
            <StickyNote2RoundedIcon style={stylesSetColor("jobs")} />
          </div>
          <div className="sidebar__item__text">
            <p style={stylesSetColor("jobs")}>Jobs</p>
          </div>
        </div>
      </Link>
      {/* Appointments */}
      <Link
        to="/appointments"
        style={{ textDecoration: "none", width: "100%" }}
      >
        <div
          className="sidebar__item"
          style={stylesSetBackgroundColor("appointments")}
        >
          <div className="sidebar__item__icon">
            <PhoneInTalkRoundedIcon style={stylesSetColor("appointments")} />
          </div>
          <div className="sidebar__item__text">
            <p style={stylesSetColor("appointments")}>Appointments</p>
          </div>
        </div>
      </Link>
      {/* Pharmacy */}
      <Link to="/pharmacy" style={{ textDecoration: "none", width: "100%" }}>
        <div
          className="sidebar__item"
          style={stylesSetBackgroundColor("pharmacy")}
        >
          <div className="sidebar__item__icon">
            <VaccinesRoundedIcon style={stylesSetColor("pharmacy")} />
          </div>
          <div className="sidebar__item__text">
            <p style={stylesSetColor("pharmacy")}>Pharmacy</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
