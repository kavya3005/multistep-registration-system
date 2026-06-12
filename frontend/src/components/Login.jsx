
import { useState } from "react";
import axios from "axios";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (input) => (e) => {

    setLoginData({
      ...loginData,
      [input]: e.target.value
    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:8001/users/signin",
        {
          email: loginData.email,
          password: loginData.password
        }
      );

      console.log(response.data);

      if(response.data.status === true){

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        setLoading(false);

        alert("Login Successful ✅");

        window.location.reload();

      } else {

        setLoading(false);

        alert(response.data.message);

      }

    } catch (error) {

      setLoading(false);

      console.log(error);

      alert("Login Failed ❌");

    }

  };

  return (

    <form className="form-container">

      <h2>Login</h2>

      <div className="input-group">

        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange("email")}
        />

      </div>

      <div className="input-group">

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange("password")}
        />

      </div>

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{
  marginTop: "10px",
  marginBottom: "20px",
  padding: "8px 14px",
  fontSize: "14px",
  width: "auto"
}}
      >
        {showPassword ? "Hide Password" : "Show Password"}
      </button>

      <button
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login →"}
      </button>

      <p
        style={{
          marginTop: "15px",
          textAlign: "center",
          cursor: "pointer",
          color: "#b26cff"
        }}
      >
        Forgot Password?
      </p>

    </form>
  );
};

export default Login;

