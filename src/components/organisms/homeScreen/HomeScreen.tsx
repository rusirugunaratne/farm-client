import * as React from "react";
import "./_index.css";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate();
  return (
    <div className="p-box">
      <div onClick={() => navigate("/farms")} className="l-box">
        <h1>FARMS</h1>
      </div>
      <div onClick={() => navigate("/workers")} className="r-box">
        <h1>WORKERS</h1>
      </div>
    </div>
  );
}

export default HomeScreen;
