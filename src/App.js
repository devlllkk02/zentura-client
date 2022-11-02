/* ----- App.js ----- */

import React from "react";
import "./App.scss";

//Packages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { createTheme, ThemeProvider } from "@mui/material/styles";

//Components
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import Patients from "./components/Patients/Patients";
import Doctors from "./components/Doctors/Doctors";
import Lab from "./components/Lab/Lab";
import Jobs from "./components/Jobs/Jobs";
import Appointments from "./components/Appointments/Appointments";
import Pharmacy from "./components/Pharmacy/Pharmacy";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1c75bc",
      light: "#60a3ef",
      dark: "#1969a9",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#2bb673",
      light: "#68e9a2",
      dark: "#008547",
      contrastText: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />}></Route>
            <Route exact path="/dashboard" element={<Dashboard />}></Route>
            <Route exact path="/patients" element={<Patients />}></Route>
            <Route exact path="/doctors" element={<Doctors />}></Route>
            <Route exact path="/labreports" element={<Lab />}></Route>
            <Route exact path="/jobs" element={<Jobs />}></Route>
            <Route exact path="/appointments" element={<Appointments />}></Route>
            <Route exact path="/pharmacy" element={<Pharmacy />}></Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
