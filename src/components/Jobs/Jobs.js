/* ----- Jobs.js ----- */
import React, { useState, useEffect } from "react";
import "./Jobs.scss";

//Libraries
import axios from "axios";

// MUI
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

//Utils
import { colors } from "../../utils/Colors.js";

//Components
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Item from "../Item/Item";
import PopupJob from "../Popup/PopupJob";

function Jobs() {
  //State
  const [displayPopup, setDisplayPopup] = useState("none");
  const [option, setOption] = useState([]);

  const [jobs, setJobs] = useState([]);

  const [current, setCurrent] = useState({
    patientName: "",
    doctorName: "",
    date: null,
    description: "",
  });

  //Use Effect
  useEffect(() => {
    getAllJobs();
  }, []);

  //Function
  const handleCreateJob = () => {
    setCurrent({
      patientName: "",
      doctorName: "",
      date: null,
      description: "",
    });
  };
  const getAllJobs = async () => {
    try {
      const lab = await axios.get("/job/getall");
      setJobs(lab.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="jobs">
        <div className="jobs__sidebar">
          <Sidebar page="jobs" />
        </div>
        <div className="jobs__content">
          {/* Title */}
          <div className="jobs__title">
            <div className="jobs__title__icon">
              <StickyNote2RoundedIcon
                style={{ color: colors.grey, fontSize: 36 }}
              />
            </div>
            <div className="jobs__title__text">
              <p>Jobs</p>
            </div>
          </div>
          {/* Controls */}
          <div className="jobs__controls">
            <div className="jobs__controls__button">
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: "12px" }}
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={() => {
                  setDisplayPopup("flex");
                  setOption("create");
                  handleCreateJob();
                }}
              >
                Add Job
              </Button>
            </div>
            <div className="jobs__controls__search">
              <TextField
                type="search"
                variant="outlined"
                label="Search"
                size="small"
                color="primary"
                sx={{ input: { color: colors.grey } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon style={{ fontSize: "20px" }} />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </div>
          </div>
          {/* Header */}
          <div className="jobs__header">
            <Header title1="Patient" title2="Doctor" title3="Date" />
          </div>
          {/* Items */}
          <div className="jobs__items">
            {jobs.map((job) => {
              return (
                <Item
                  page="jobs"
                  key={job.id}
                  id={job.id}
                  title1={job.patientName}
                  title2={job.doctorName}
                  title3={job.date}
                  title4="View Job"
                  // Display
                  setDisplayPopup={setDisplayPopup}
                  setOption={setOption}
                  // Current Document
                  current={current}
                  setCurrent={setCurrent}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="jobs__popup" style={{ display: displayPopup }}>
        <PopupJob
          setDisplayPopup={setDisplayPopup}
          option={option}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </>
  );
}

export default Jobs;
