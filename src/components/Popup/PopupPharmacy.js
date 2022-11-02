/* ----- PopupPharmacy.js ----- */
import React, { useState, useEffect } from "react";
import "./Popup.scss";

// MUI
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import Button from "@mui/material/Button";
import { Autocomplete, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//Libraries
import axios from "axios";

//Utils
import { colors } from "../../utils/Colors.js";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";

function PopupPharmacy({ setDisplayPopup, option, current, setCurrent }) {
  //State

  //*Patients
  const [patients, setPatients] = useState([]);
  const [patientOptions, setPatientOptions] = useState([]);
  const [patientValue, setPatientValue] = useState();

  //*Doctors
  const [doctors, setDoctors] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [doctorValue, setDoctorValue] = useState();

  //Use Effect
  useEffect(() => {
    getAllPatientsDoctors();
  }, []);

  useEffect(() => {
    var p = [];
    var d = [];
    patients.map((patient) => {
      p.push({
        label: `${patient.firstName} ${patient.lastName}`,
        key: patient.id,
      });
    });

    doctors.map((doctor) => {
      d.push({
        label: `${doctor.firstName} ${doctor.lastName}`,
        key: doctor.id,
      });
    });
    setPatientOptions(p);
    setDoctorOptions(d);
  }, [patients, doctors]);

  useEffect(() => {
    setCurrent({
      ...current,
      patientName: patientValue,
    });
  }, [patientValue]);

  useEffect(() => {
    setCurrent({
      ...current,
      doctorName: doctorValue,
    });
  }, [doctorValue]);

  //Functions
  const getAllPatientsDoctors = async () => {
    try {
      const patients = await axios.get("/patient/getall");
      const doctors = await axios.get("/doctor/getall");

      setPatients(patients.data);
      setDoctors(doctors.data);
    } catch (e) {
      console.log(e);
    }
  };

  const stylesDisplayButton = () => {
    if (option === "create") {
      return "none";
    }
    if (option === "view") {
      return "flex";
    }
  };

  //Create
  const handleCreate = async () => {
    try {
      const response = await axios.post("/pharmacy/create", current);
      window.location.reload();
    } catch (e) {
      console.log(e.response.data);
    }
  };

  //Update
  const handleUpdate = async () => {
    await axios.put(`/pharmacy/update/${current.id}`, current);
    window.location.reload();
  };

  //Delete
  const handleDelete = async () => {
    await axios.delete(`/pharmacy/delete/${current.id}`);
    window.location.reload();
  };
  return (
    <div className="popup">
      <div className="popup__container">
        <div className="popup__header">
          <div className="popup__header__createupdate">
            <div
              className="popup__header__create__button"
              style={{
                display: stylesDisplayButton() === "none" ? "flex" : "none",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                style={{ fontSize: "12px" }}
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
            <div
              className="popup__header__update__button"
              style={{ display: stylesDisplayButton() }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: "12px" }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </div>
          <div
            className="popup__header__delete"
            style={{ display: stylesDisplayButton() }}
          >
            <div className="popup__header__delete__button">
              <Button
                variant="contained"
                color="error"
                style={{ fontSize: "12px" }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
          <div className="popup__header__cancel">
            <div
              className="popup__header__cancel__icon"
              onClick={() => setDisplayPopup("none")}
            >
              <ClearRoundedIcon style={{ fontSize: "20px" }} />
            </div>
          </div>
        </div>
        <div className="popup__body">
          {/* Patient Name */}
          <div className="popup__body__field">
            <Autocomplete
              disablePortal
              options={patientOptions}
              value={current.patientName}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField fullWidth {...params} label="Patient" />
              )}
              onChange={(e) => {
                setPatientValue(e.target.innerText);
              }}
            />
          </div>
          {/* Doctor Name */}
          <div className="popup__body__field">
            <Autocomplete
              disablePortal
              options={doctorOptions}
              value={current.doctorName}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField fullWidth {...params} label="Doctor" />
              )}
              onChange={(e) => {
                setDoctorValue(e.target.innerText);
              }}
            />
          </div>
          {/* Date*/}
          <div className="popup__body__field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date"
                renderInput={(params) => (
                  <TextField size="small" fullWidth {...params} />
                )}
                size="small"
                value={current.date}
                onChange={(e) =>
                  setCurrent({
                    ...current,
                    date: e,
                  })
                }
              />
            </LocalizationProvider>
          </div>
          {/* Medicine */}
          <div className="popup__body__field">
            <TextField
              label="Medicine"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={5}
              sx={{ input: { color: colors.grey } }}
              value={current.medicine}
              onChange={(e) =>
                setCurrent({
                  ...current,
                  medicine: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupPharmacy;
