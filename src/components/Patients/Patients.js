/* ----- Patients.js ----- */
import React, { useState, useEffect } from "react";
import "./Patients.scss";

//Libraries
import axios from "axios";

// MUI
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
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
import PopupPatient from "../Popup/PopupPatient";

function Patients() {
  //State
  const [displayPopup, setDisplayPopup] = useState("none");
  const [option, setOption] = useState("");

  const [patients, setPatients] = useState([]);

  const [current, setCurrent] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    address: "",
    mobile: "",
  });

  //Use Effect
  useEffect(() => {
    getAllPatients();
  }, []);

  //Function
  const handleCreatePatient = () => {
    setCurrent({
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      address: "",
      mobile: "",
    });
  };
  const getAllPatients = async () => {
    try {
      const patients = await axios.get("/patient/getall");
      setPatients(patients.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="patients">
        <div className="patients__sidebar">
          <Sidebar page="patients" />
        </div>
        <div className="patients__content">
          {/* Title */}
          <div className="patients__title">
            <div className="patients__title__icon">
              <Person2RoundedIcon
                style={{ color: colors.grey, fontSize: 36 }}
              />
            </div>
            <div className="patients__title__text">
              <p>Patients</p>
            </div>
          </div>
          {/* Controls */}
          <div className="patients__controls">
            <div className="patients__controls__button">
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: "12px" }}
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={() => {
                  setDisplayPopup("flex");
                  setOption("create");
                  handleCreatePatient();
                }}
              >
                Add Patient
              </Button>
            </div>
            <div className="patients__controls__search">
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
          <div className="patients__header">
            <Header title1="Name" title2="Mobile" title3="" />
          </div>
          {/* Items */}
          <div className="patients__items">
            {patients.map((patient) => {
              return (
                <Item
                  page="patients"
                  key={patient.id}
                  id={patient.id}
                  title1={`${patient.firstName} ${patient.lastName}`}
                  title2={patient.mobile}
                  title3=""
                  title4="View Patient"
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
      <div className="patients__popup" style={{ display: displayPopup }}>
        <PopupPatient
          setDisplayPopup={setDisplayPopup}
          option={option}
          // id={id}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </>
  );
}

export default Patients;
