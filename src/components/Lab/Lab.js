/* ----- Lab.js ----- */
import React, { useState, useEffect } from "react";
import "./Lab.scss";

//Libraries
import axios from "axios";

// MUI
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
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
import PopupLab from "../Popup/PopupLab";

function Lab() {
  //State
  const [displayPopup, setDisplayPopup] = useState("none");
  const [option, setOption] = useState([]);

  const [labReports, setLabReports] = useState([]);

  const [current, setCurrent] = useState({
    patientName: "",
    date: null,
    description: "",
    link: "",
  });

  //Use Effect
  useEffect(() => {
    getAllLabs();
  }, []);

  //Function
  const handleCreateLabReport = () => {
    setCurrent({
      patientName: "",
      date: null,
      description: "",
      link: "",
    });
  };
  const getAllLabs = async () => {
    try {
      const lab = await axios.get("/lab/getall");
      setLabReports(lab.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="lab">
        <div className="lab__sidebar">
          <Sidebar page="labreports" />
        </div>
        <div className="lab__content">
          {/* Title */}
          <div className="lab__title">
            <div className="lab__title__icon">
              <DescriptionRoundedIcon
                style={{ color: colors.grey, fontSize: 36 }}
              />
            </div>
            <div className="lab__title__text">
              <p>Lab</p>
            </div>
          </div>
          {/* Controls */}
          <div className="lab__controls">
            <div className="lab__controls__button">
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: "12px" }}
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={() => {
                  setDisplayPopup("flex");
                  setOption("create");
                  handleCreateLabReport();
                }}
              >
                Add Lab Report
              </Button>
            </div>
            <div className="lab__controls__search">
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
          <div className="lab__header">
            <Header title1="Patient Name" title2="Date" title3="" />
          </div>
          {/* Items */}
          <div className="lab__items">
            {labReports.map((report) => {
              return (
                <Item
                  page="labReports"
                  key={report.id}
                  id={report.id}
                  title1={report.patientName}
                  title2={report.date}
                  title3=""
                  title4="View Report"
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
      <div className="lab__popup" style={{ display: displayPopup }}>
        <PopupLab
          setDisplayPopup={setDisplayPopup}
          option={option}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </>
  );
}

export default Lab;
