import React, { useState } from "react";
import Login from "../auth/login.jsx";
import "./loginStatus.css";

const LoginStatus = () => {
  const [tap, setTap] = useState(false);

  return (
    <div className="log">
      <div className="login-status">
        <p>Login to Use</p>
        <div onClick={() => setTap(!tap)} className="btn">Login</div>
      </div>
      {tap && <Login />}
    </div>
  );
};

export default LoginStatus;
