/* ----- Pharmacy.js ----- */
import React, { useState, useEffect } from "react";
import "./Pharmacy.scss";

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
import PopupPharmacy from "../Popup/PopupPharmacy";

function Pharmacy() {
  //State
  const [displayPopup, setDisplayPopup] = useState("none");
  const [option, setOption] = useState([]);

  const [invoices, setInvoices] = useState([]);

  const [current, setCurrent] = useState({
    patientName: "",
    doctorName: "",
    date: null,
    medicine: "",
  });

  //Use Effect
  useEffect(() => {
    getAllInvoices();
  }, []);

  //Function
  const handleCreateInvoice = () => {
    setCurrent({
      patientName: "",
      doctorName: "",
      date: null,
      medicine: "",
    });
  };
  const getAllInvoices = async () => {
    try {
      const invoice = await axios.get("/pharmacy/getall");
      setInvoices(invoice.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="pharmacy">
        <div className="pharmacy__sidebar">
          <Sidebar page="pharmacy" />
        </div>
        <div className="pharmacy__content">
          {/* Title */}
          <div className="pharmacy__title">
            <div className="pharmacy__title__icon">
              <Person2RoundedIcon
                style={{ color: colors.grey, fontSize: 36 }}
              />
            </div>
            <div className="pharmacy__title__text">
              <p>Pharmacy</p>
            </div>
          </div>
          {/* Controls */}
          <div className="pharmacy__controls">
            <div className="pharmacy__controls__button">
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: "12px" }}
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={() => {
                  setDisplayPopup("flex");
                  setOption("create");
                  handleCreateInvoice();
                }}
              >
                Add Invoice
              </Button>
            </div>
            <div className="pharmacy__controls__search">
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
          <div className="pharmacy__header">
            <Header title1="Patient" title2="Doctor" title3="Date" />
          </div>
          {/* Items */}
          <div className="pharmacy__items">
            {invoices.map((invoice) => {
              return (
                <Item
                  page="pharmacy"
                  key={invoice.id}
                  id={invoice.id}
                  title1={invoice.patientName}
                  title2={invoice.doctorName}
                  title3={invoice.date}
                  title4="View Invoice"
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
      <div className="pharmacy__popup" style={{ display: displayPopup }}>
        <PopupPharmacy
          setDisplayPopup={setDisplayPopup}
          option={option}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </>
  );
}

export default Pharmacy;
