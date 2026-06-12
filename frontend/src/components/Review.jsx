import { saveLog } from "../services/mongoApi";
import axios from "axios";
import { useState } from "react";

const Review = ({ prevStep, formData }) => {

  const [loading, setLoading] = useState(false);

  const backStep = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleSubmit = async () => {

    setLoading(true);

    console.log("FORM DATA =", formData);

    try {

      const response = await axios.post(
        "http://localhost:8001/users/signup",
        {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          username: formData.username
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log(response.data);

      // CHECK STATUS
      if(response.data.status === true){

  try {

    await saveLog({
      sessionId: "S001",
      step: 4,
      action: "Registration Submitted Successfully"
    });

  } catch(error) {

    console.log(error);

  }

  setLoading(false);

  localStorage.removeItem("currentStep");
  localStorage.removeItem(
  "registrationData"
);
localStorage.removeItem("authMode");
alert("Registration Successful ✅");

window.location.reload();

} else {

        setLoading(false);

        alert(response.data.message);
      }

    } catch (error) {

      setLoading(false);

      console.log(error);

      alert("Registration Failed ❌");
    }
  };

  return (

    <div className="form-container">

      <h2>Review & Submit</h2>

      <div className="review-box">

  <p>
    <strong>Full Name:</strong> {formData.fullname}
  </p>

  <p>
    <strong>Email:</strong> {formData.email}
  </p>

  <p>
    <strong>Phone:</strong> {formData.phone}
  </p>

  <p>
    <strong>Username:</strong> {formData.username}
  </p>

  <p>
    <strong>City:</strong> {formData.city}
  </p>

  <p>
    <strong>Country:</strong> {formData.country}
  </p>

  <p>
    <strong>Occupation:</strong> {formData.occupation}
  </p>

  <p>
    <strong>Password:</strong> ********
  </p>

</div>

      <div className="button-group">

        <button onClick={backStep}>
          ← Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
        >

          {loading ? "Submitting..." : "Submit ✓"}

        </button>

      </div>

    </div>
  );
};

export default Review;