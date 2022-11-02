/* ----- Appointments.js ----- */
import React, { useState, useEffect } from "react";
import "./Appointments.scss";

//Libraries
import axios from "axios";

// MUI
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
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
import PopupAppointments from "../Popup/PopupAppointments";

function Appointments() {
  //State
  const [displayPopup, setDisplayPopup] = useState("none");
  const [option, setOption] = useState([]);

  const [appointments, setAppointments] = useState([]);

  const [current, setCurrent] = useState({
    patientName: "",
    doctorName: "",
    date: null,
    remarks: "",
  });

  //Use Effect
  useEffect(() => {
    getAllAppointments();
  }, []);

  //Function
  const handleCreateAppointment = () => {
    setCurrent({
      patientName: "",
      doctorName: "",
      date: null,
      remarks: "",
    });
  };
  const getAllAppointments = async () => {
    try {
      const appointment = await axios.get("/appointment/getall");
      setAppointments(appointment.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="appointments">
        <div className="appointments__sidebar">
          <Sidebar page="appointments" />
        </div>
        <div className="appointments__content">
          {/* Title */}
          <div className="appointments__title">
            <div className="appointments__title__icon">
              <PhoneInTalkRoundedIcon
                style={{ color: colors.grey, fontSize: 36 }}
              />
            </div>
            <div className="appointments__title__text">
              <p>Appointments</p>
            </div>
          </div>
          {/* Controls */}
          <div className="appointments__controls">
            <div className="appointments__controls__button">
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: "12px" }}
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={() => {
                  setDisplayPopup("flex");
                  setOption("create");
                  handleCreateAppointment();
                }}
              >
                Add Appointment
              </Button>
            </div>
            <div className="appointments__controls__search">
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
          <div className="appointments__header">
            <Header title1="Patient" title2="Doctor" title3="Date" />
          </div>
          {/* Items */}
          <div className="appointments__items">
            {appointments.map((job) => {
              return (
                <Item
                  page="appointments"
                  key={job.id}
                  id={job.id}
                  title1={job.patientName}
                  title2={job.doctorName}
                  title3={job.date}
                  title4="View Appointment"
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
      <div className="appointments__popup" style={{ display: displayPopup }}>
        <PopupAppointments
          setDisplayPopup={setDisplayPopup}
          option={option}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </>
  );
}

export default Appointments;
