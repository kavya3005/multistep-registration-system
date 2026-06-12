
import { useState } from "react";

import "./App.css";
import RegistrationSearch
from "./components/RegistrationSearch";
import Analytics from "./components/Analytics";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProgressSteps from "./components/ProgressSteps";
import HelpPanel from "./components/HelpPanel";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Review from "./components/Review";

function App() {

  const [step, setStep] = useState(
  Number(localStorage.getItem("currentStep")) || 1
);

const [authMode, setAuthMode] = useState(
  localStorage.getItem("authMode") || "login"
);
  // FORM DATA
 const [formData, setFormData] = useState(
  JSON.parse(
    localStorage.getItem("registrationData")
  ) || {
    fullname: "",
    email: "",
    password: "",
    phone: "",
    username: "",
    city: "",
    country: "",
    occupation: ""
  }
);

  // NEXT STEP
 const nextStep = () => {

  const newStep = step + 1;

  setStep(newStep);

  localStorage.setItem(
    "currentStep",
    newStep
  );
};

const prevStep = () => {

  const newStep = step - 1;

  setStep(newStep);

  localStorage.setItem(
    "currentStep",
    newStep
  );
};

  // HANDLE INPUT
 const handleChange = (input) => (e) => {

  const updatedData = {
    ...formData,
    [input]: e.target.value
  };

  setFormData(updatedData);

  localStorage.setItem(
    "registrationData",
    JSON.stringify(updatedData)
  );
};
  // CHECK LOGGED USER
  const user = JSON.parse(localStorage.getItem("user"));

  // RENDER STEPS
  const renderStep = () => {

    switch(step) {

      case 1:
        return authMode === "login" ? (
          <Login />
        ) : (
          <Step1
            nextStep={nextStep}
            handleChange={handleChange}
            formData={formData}
          />
        );

      case 2:
        return (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            formData={formData}
          />
        );

      case 3:
        return (
          <Step3
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            formData={formData}
          />
        );

      case 4:
        return (
          <Review
            prevStep={prevStep}
            formData={formData}
          />
        );

      default:
        return (
          <Step1
            nextStep={nextStep}
            handleChange={handleChange}
            formData={formData}
          />
        );
    }
  };

  return (

    <div className="app">

      <Navbar />

      <div className="main-layout">

        <div className="form-section">

          <div className="glass-card">

            <div className="auth-toggle">

  <button
    className={authMode === "login" ? "active" : ""}
    onClick={() => {
      setAuthMode("login");
      localStorage.setItem("authMode", "login");
      setStep(1);
      localStorage.setItem("currentStep", 1);
    }}
  >
    Login
  </button>

  <button
    className={authMode === "register" ? "active" : ""}
    onClick={() => {
      setAuthMode("register");
      localStorage.setItem("authMode", "register");
      setStep(1);
      localStorage.setItem("currentStep", 1);
    }}
  >
    Register
  </button>

</div>

              {authMode === "register" && (
    <ProgressSteps step={step} />
  )}

            {user ? <Dashboard /> : renderStep()}

          </div>

        </div>

        <div className="help-section">

  <HelpPanel />

  <Analytics />
<RegistrationSearch />
</div>

      </div>

    </div>
  );
}

export default App;

