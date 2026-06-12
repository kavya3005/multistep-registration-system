import { saveSession, saveLog }
from "../services/mongoApi";
const Step1 = ({ nextStep, handleChange, formData }) => {

const continueStep = async (e) => {

  e.preventDefault();

  console.log(formData);

  // EMPTY FIELD VALIDATION
  if (
    formData.fullname === "" ||
    formData.email === "" ||
    formData.phone === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  // EMAIL VALIDATION
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(formData.email)) {
    alert("Invalid email address");
    return;
  }

  // PHONE VALIDATION
  if (formData.phone.length !== 10) {
    alert("Phone number must be 10 digits");
    return;
  }

  try {

    await saveSession({
      sessionId: "S001",
      currentStep: 1,
      data: formData
    });

    await saveLog({
      sessionId: "S001",
      step: 1,
      action: "Completed Basic Information"
    });

  } catch (error) {
    console.log(error);
  }
localStorage.setItem("currentStep", "2");
  nextStep();
};
  return (

    <form className="form-container">

      <h2>Basic Information</h2>

      <div className="input-group">

        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange("fullname")}
          required
        />

      </div>

      <div className="input-group">

        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange("email")}
          required
        />

      </div>

      <div className="input-group">

        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange("phone")}
          required
        />

      </div>

      <button onClick={continueStep}>
        Next Step →
      </button>

    </form>

  );
};

export default Step1;

