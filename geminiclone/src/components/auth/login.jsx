import React, { useState, useContext } from "react";
import axios from "axios";
import "./login.css";
import { dataContext } from "../../context/dataContext.jsx";

const Login = () => {
  const [email1, setEmail] = useState("");
  const [pass1, setPass] = useState("");
  const [register, setRegister] = useState(false);
  const [name,setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useContext(dataContext);

  const registerHandler = async () => {
    setLoading(true);
    setErr("");
    try {
      if (!email1 || !pass1 || !confirm || !name || pass1 !== confirm) {
        setErr("Please enter all details properly and ensure passwords match.");
        setLoading(false);
        return;
      }

      const res = await axios.post("https://gemini-clone-9349.vercel.app/api/auth/register", {
        username: name,
        email: email1,
        password: pass1,
      });

      if (res.status === 201) {
        setRegister(false);
      } else {
        setErr(res.data.message || "Registration failed.");
      }
    } catch (error) {
      console.log("ERROR:", error);
      setErr("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginHandler = async () => {
    setLoading(true);
    setErr("");
    try {
      if (!email1 || !pass1) {
        setErr("Please enter both email and password.");
        setLoading(false);
        return;
      }

      const res = await axios.post("https://gemini-clone-9349.vercel.app/api/auth/login", {
        email: email1,
        password: pass1,
      });

      if (res.status === 200) {
        const { email, username } = res.data.user;
        login(email, username);
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
      } else {
        setErr(res.data.message || "Login failed.");
      }
    } catch (error) {
      console.log("ERROR:", error);
      setErr("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-title">{register ? "Register" : "Login"}</div>
      <div className="login-inputs">
        {register && (
          <input
            type="text"
            placeholder="Enter Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Enter email"
          value={email1}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={pass1}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        {register && (
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        )}
        {err && (
          <p style={{ color: "red", width: "100%", textAlign: "center", paddingBottom: "5px" }}>{err}</p>
        )}
        <button onClick={register ? registerHandler : loginHandler} disabled={loading}>
          {loading ? (register ? "Registering..." : "Logging in...") : register ? "Register" : "Login"}
        </button>
        {register ? (
          <p>
            Already have an account?{" "}
            <span style={{ cursor: "pointer" }} onClick={() => setRegister(false)}>
              Login
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span style={{ cursor: "pointer" }} onClick={() => setRegister(true)}>
              Register
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
