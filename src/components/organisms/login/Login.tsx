import * as React from "react";
import logo from "../../../assets/images/logo.svg";
import LoginBox from "../../molecules/login/LoginBox";
import "./_index.css";

function Login() {
  return (
    <div className="parent-box">
      <div className="left-box">
        <img src={logo} alt="" />
      </div>
      <div className="right-box">
        <LoginBox />
      </div>
    </div>
  );
}

export default Login;
