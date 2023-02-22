import * as React from "react";
import HomeCard from "../../molecules/homeCard/HomeCard";
import "./_index.css";

function HomeScreen() {
  return (
    <div className="p-box">
      <div className="l-box">
        <HomeCard
          name="farm"
          title="Fish Farms"
          details="Manage Fish Farms"
          route="/farms"
        />
      </div>
      <div className="r-box">
        <HomeCard
          name="worker"
          title="Workers"
          details="Manage Workers"
          route="/workers"
        />
      </div>
    </div>
  );
}

export default HomeScreen;
