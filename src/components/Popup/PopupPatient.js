/* ----- PopupPatient.js ----- */
import React from "react";
import "./Popup.scss";

// MUI
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//Libraries
import axios from "axios";

//Utils
import { colors } from "../../utils/Colors.js";
import { DatePicker } from "@mui/x-date-pickers";

function PopupPatient({ setDisplayPopup, option, current, setCurrent, id }) {
  //State

  //Functions
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
      const response = await axios.post("/patient/create", current);
      window.location.reload();
    } catch (e) {
      console.log(e.response.data);
    }
  };

  //Update
  const handleUpdate = async () => {
    await axios.put(`/patient/update/${current.id}`, current);
    window.location.reload();
  };

  //Delete
  const handleDelete = async () => {
    await axios.delete(`/patient/delete/${current.id}`);
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
          {/* First Name */}
          <div className="popup__body__field">
            <TextField
              label="First Name"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ input: { color: colors.grey } }}
              value={current.firstName}
              onChange={(e) =>
                setCurrent({
                  ...current,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          {/* Last Name */}
          <div className="popup__body__field">
            <TextField
              label="Last Name"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ input: { color: colors.grey } }}
              value={current.lastName}
              onChange={(e) =>
                setCurrent({
                  ...current,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          {/* Date of Birth */}
          <div className="popup__body__field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                renderInput={(params) => (
                  <TextField size="small" fullWidth {...params} />
                )}
                size="small"
                value={current.dateOfBirth}
                onChange={(e) =>
                  setCurrent({
                    ...current,
                    dateOfBirth: e,
                  })
                }
              />
            </LocalizationProvider>
          </div>
          {/* Address */}
          <div className="popup__body__field">
            <TextField
              label="Address"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={5}
              sx={{ input: { color: colors.grey } }}
              value={current.address}
              onChange={(e) =>
                setCurrent({
                  ...current,
                  address: e.target.value,
                })
              }
            />
          </div>
          {/* Mobile */}
          <div className="popup__body__field">
            <TextField
              label="Mobile"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ input: { color: colors.grey } }}
              value={current.mobile}
              onChange={(e) =>
                setCurrent({
                  ...current,
                  mobile: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupPatient;
