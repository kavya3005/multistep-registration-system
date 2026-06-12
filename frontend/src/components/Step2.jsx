 import { saveSession, saveLog } from "../services/mongoApi";
 import { useState } from "react";

const Step2 = ({ nextStep, prevStep, handleChange, formData }) => {

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 const continueStep = async (e) => {

  e.preventDefault();

  // EMPTY VALIDATION
  if (
    formData.username === "" ||
    formData.password === "" ||
    confirmPassword === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  // PASSWORD LENGTH
  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  // PASSWORD MATCH
  if (formData.password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {

    await saveSession({
      sessionId: "S001",
      currentStep: 2,
      data: formData
    });

    await saveLog({
      sessionId: "S001",
      step: 2,
      action: "Completed Account Details"
    });

  } catch (error) {
    console.log(error);
  }
localStorage.setItem("currentStep", "3");
  nextStep();
};
  const backStep = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (

    <form className="form-container">

      <h2>Account Details</h2>

      <div className="input-group">

        <input
          type="text"
          placeholder="Username"
          value={formData.username || ""}
          onChange={(e) => {

            console.log(e.target.value);

            handleChange("username")(e);

          }}
          required
        />

      </div>

      <div className="input-group">

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange("password")}
          required
        />

        <p
          style={{
            marginTop: "10px",
            color: "#d8b4fe",
            fontWeight: "bold"
          }}
        >

          Password Strength:

          {
            formData.password.length < 6
            ? " Weak ❌"
            : formData.password.length < 10
            ? " Medium ⚠️"
            : " Strong ✅"
          }

        </p>

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            marginTop: "10px",
            padding: "8px 12px",
            fontSize: "14px",
            width: "auto"
          }}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

      </div>

      <div className="input-group">

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

      </div>

      <div className="button-group">

        <button onClick={backStep}>
          ← Back
        </button>

        <button onClick={continueStep}>
          Next →
        </button>

      </div>

    </form>
  );
};

export default Step2;