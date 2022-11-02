/* ----- Dashboard.js ----- */
import React, { useState, useEffect } from "react";
import "./Dashboard.scss";

//Libraries
import axios from "axios";

//Components
import Sidebar from "../Sidebar/Sidebar";

function Dashboard() {
  //State
  const [count, setCount] = useState({
    patients: 0,
    doctors: 0,
    labReports: 0,
    jobs: 0,
    appointments: 0,
    pharmacy: 0,
  });
  //Use Effect
  useEffect(() => {
    getStats();
  }, []);

  //Function

  const getStats = async () => {
    try {
      const patients = await axios.get("/patient/getall");
      const doctors = await axios.get("/doctor/getall");
      const labReports = await axios.get("/lab/getall");
      const jobs = await axios.get("/job/getall");
      const appointments = await axios.get("/appointment/getall");
      const pharmacy = await axios.get("/pharmacy/getall");

      var countToDisplay = {
        patients: patients.data.length,
        doctors: doctors.data.length,
        labReports: labReports.data.length,
        jobs: jobs.data.length,
        appointments: appointments.data.length,
        pharmacy: pharmacy.data.length,
      };

      setCount(countToDisplay);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <Sidebar page="dashboard" />
      </div>
      <div className="dashboard__content">
        <div className="dashboard__title">
          <p>Welcome to Zentura Health</p>
        </div>
        <div className="dashboard__cards">
          <div className="dashboard__cards__row">
            {/* Patients */}
            <div className="dashboard__card">
              <div className="dashboard__card__title">
                <p>Patients</p>
              </div>
              <div className="dashboard__card__body">
                <div className="dashboard__card__image">
                  <img src="./images/DashboardIcons/patient.png" alt="" />
                </div>
                <div className="dashboard__card__count">
                  <p>{String(count.patients).padStart(2, "0")}</p>
                </div>
              </div>
            </div>
            {/* Doctors */}
            <div className="dashboard__card">
              <div className="dashboard__card__title">
                <p>Doctors</p>
              </div>
              <div className="dashboard__card__body">
                <div className="dashboard__card__image">
                  <img src="./images/DashboardIcons/doctor.png" alt="" />
                </div>
                <div className="dashboard__card__count">
                  <p>{String(count.doctors).padStart(2, "0")}</p>
                </div>
              </div>
            </div>
            {/* Lab Reports */}
            <div className="dashboard__card">
              <div className="dashboard__card__title">
                <p>Lab Reports</p>
              </div>
              <div className="dashboard__card__body">
                <div className="dashboard__card__image">
                  <img src="./images/DashboardIcons/lab.png" alt="" />
                </div>
                <div className="dashboard__card__count">
                  <p>{String(count.labReports).padStart(2, "0")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard__cards__row">
            {/* Jobs */}
            <div className="dashboard__card">
              <div className="dashboard__card__title">
                <p>Jobs</p>
              </div>
              <div className="dashboard__card__body">
                <div className="dashboard__card__image">
                  <img src="./images/DashboardIcons/job.png" alt="" />
                </div>
                <div className="dashboard__card__count">
                  <p>{String(count.jobs).padStart(2, "0")}</p>
                </div>
              </div>
            </div>
            {/* Appointments */}
            <div className="dashboard__card">
              <div className="dashboard__card__title">
                <p>Appointments</p>
              </div>
              <div className="dashboard__card__body">
                <div className="dashboard__card__image">
                  <img src="./images/DashboardIcons/appointment.png" alt="" />
                </div>
                <div className="dashboard__card__count">
                  <p>{String(count.appointments).padStart(2, "0")}</p>
                </div>
              </div>
            </div>
            {/* Pharmacy */}
            <div className="dashboard__card">
              <div className="dashboard__card__title">
                <p>Pharmacy</p>
              </div>
              <div className="dashboard__card__body">
                <div className="dashboard__card__image">
                  <img src="./images/DashboardIcons/pharmacy.png" alt="" />
                </div>
                <div className="dashboard__card__count">
                  <p>{String(count.pharmacy).padStart(2, "0")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
