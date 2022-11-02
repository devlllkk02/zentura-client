/* ----- Landing.js ----- */
import React from "react";
import "./Landing.scss";

//Packages
import { Link } from "react-router-dom";

//MUI
import Button from "@mui/material/Button";

function Landing() {
  return (
    <div
      className="landing"
      style={{ backgroundImage: "url(/images/LandingImage4.jpg)" }}
    >
      <div className="landing__sidebar">
        <div className="landing__container">
          <div className="landing__logo">
            <img src="./images/ZenturaHealthLogo.png" alt="" />
          </div>
          <div className="landing__button">
            <Link to="/dashboard">
              <Button variant="contained" color="primary" fullWidth>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
