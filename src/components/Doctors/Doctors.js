/* ----- Doctors.js ----- */
import React, { useState, useEffect } from "react";
import "./Doctors.scss";

// MUI
import Person4RoundedIcon from "@mui/icons-material/Person4Rounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

//Libraries
import axios from "axios";

//Utils
import { colors } from "../../utils/Colors.js";

//Components
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Item from "../Item/Item";
import PopupDoctor from "../Popup/PopupDoctor";

function Doctors() {
  //State
  const [displayPopup, setDisplayPopup] = useState("none");
  const [option, setOption] = useState("");

  const [doctors, setDoctors] = useState([]);

  const [current, setCurrent] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    channellingTime: "",
  });

  //Use Effect
  useEffect(() => {
    getAllDoctors();
  }, []);

  //Function
  const handleCreateDoctor = () => {
    setCurrent({
      firstName: "",
      lastName: "",
      designation: "",
      channellingTime: "",
    });
  };
  const getAllDoctors = async () => {
    try {
      const doctors = await axios.get("/doctor/getall");
      setDoctors(doctors.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="doctors">
        <div className="doctors__sidebar">
          <Sidebar page="doctors" />
        </div>
        <div className="doctors__content">
          {/* Title */}
          <div className="doctors__title">
            <div className="doctors__title__icon">
              <Person4RoundedIcon
                style={{ color: colors.grey, fontSize: 36 }}
              />
            </div>
            <div className="doctors__title__text">
              <p>Doctors</p>
            </div>
          </div>
          {/* Controls */}
          <div className="doctors__controls">
            <div className="doctors__controls__button">
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: "12px" }}
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={() => {
                  setDisplayPopup("flex");
                  setOption("create");
                  handleCreateDoctor();
                }}
              >
                Add Doctor
              </Button>
            </div>
            <div className="doctors__controls__search">
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
          <div className="doctors__header">
            <Header title1="Name" title2="Designation" title3="" />
          </div>
          {/* Items */}
          <div className="doctors__items">
            {doctors.map((doctor) => {
              return (
                <Item
                  page="doctors"
                  key={doctor.id}
                  id={doctor.id}
                  title1={`${doctor.firstName} ${doctor.lastName}`}
                  title2={doctor.designation}
                  title3=""
                  title4="View Doctor"
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
      <div className="doctors__popup" style={{ display: displayPopup }}>
        <PopupDoctor
          setDisplayPopup={setDisplayPopup}
          option={option}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </>
  );
}

export default Doctors;
