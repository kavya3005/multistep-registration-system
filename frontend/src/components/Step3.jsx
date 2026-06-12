import { saveSession, saveLog } from "../services/mongoApi";

const Step3 = ({
  nextStep,
  prevStep,
  handleChange,
  formData
}) => {

  const continueStep = async (e) => {

    e.preventDefault();

    if (
      !formData.city ||
      !formData.country ||
      !formData.occupation
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      await saveSession({
        sessionId: "S001",
        currentStep: 3,
        data: formData
      });

      await saveLog({
        sessionId: "S001",
        step: 3,
        action: "Completed Profile Details"
      });

    } catch (error) {
      console.log(error);
    }
localStorage.setItem("currentStep", "4");
    nextStep();
  };

  const backStep = (e) => {

    e.preventDefault();

    prevStep();
  };

  return (

    <form className="form-container">

      <h2>Profile Details</h2>

      <div className="input-group">

        <input
          type="text"
          placeholder="City"
          value={formData.city || ""}
          onChange={handleChange("city")}
          required
        />

      </div>

      <div className="input-group">

        <input
          type="text"
          placeholder="Country"
          value={formData.country || ""}
          onChange={handleChange("country")}
          required
        />

      </div>

      <div className="input-group">

        <input
          type="text"
          placeholder="Occupation"
          value={formData.occupation || ""}
          onChange={handleChange("occupation")}
          required
        />

      </div>

      <div className="button-group">

        <button onClick={backStep}>
          ← Back
        </button>

        <button onClick={continueStep}>
          Review →
        </button>

      </div>

    </form>

  );
};

export default Step3;