/* ----- Item.js ----- */
import React, { useEffect } from "react";
import "./Item.scss";

//Libraries
import dayjs from "dayjs";

// MUI
import Button from "@mui/material/Button";
import axios from "axios";
import { DateFormat } from "../../utils/DateFormat";

function Item({
  page,
  id,
  title1,
  title2,
  title3,
  title4,
  setDisplayPopup,
  setOption,
  current,
  setCurrent,
}) {
  //Functions
  const getADocument = async () => {
    var document;
    if (page === "patients") {
      document = await axios.get(`/patient/get/${id}`);
      setCurrent(document.data);
    }
    if (page === "doctors") {
      document = await axios.get(`/doctor/get/${id}`);
      setCurrent(document.data);
    }
    if (page === "labReports") {
      document = await axios.get(`/lab/get/${id}`);
      setCurrent(document.data);
    }
    if (page === "jobs") {
      document = await axios.get(`/job/get/${id}`);
      setCurrent(document.data);
    }
    if (page === "appointments") {
      document = await axios.get(`/appointment/get/${id}`);
      setCurrent(document.data);
    }
    if (page === "pharmacy") {
      document = await axios.get(`/pharmacy/get/${id}`);
      setCurrent(document.data);
    }
  };

  const setTitle2 = () => {
    if (page === "labReports") {
      var date = DateFormat(title2);
      return `${date.month.short} ${date.date}, ${date.year} `;
    } else {
      return title2;
    }
  };

  const setTitle3 = () => {
    if (page === "jobs" || page === "appointments" || page === "pharmacy") {
      var date = DateFormat(title3);
      return `${date.month.short} ${date.date}, ${date.year} ${date.time.format_12.hours}:${date.time.format_12.minutes} ${date.time.format_12.period}`;
    } else {
      return title3;
    }
  };

  return (
    <div className="item">
      <div className="item__title">
        <p>{title1}</p>
      </div>
      <div className="item__title">
        <p>{setTitle2()}</p>
      </div>
      <div className="item__title">
        <p>{setTitle3()}</p>
      </div>
      <div className="item__title">
        <Button
          variant="outlined"
          color="primary"
          style={{ fontSize: "12px" }}
          onClick={() => {
            setDisplayPopup("flex");
            setOption("view");
            getADocument();
          }}
        >
          {title4}
        </Button>
      </div>
    </div>
  );
}

export default Item;
