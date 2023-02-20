import * as React from "react";
import TopBar from "../../molecules/appBar/TopBar";
import FishFarmSection from "../fishFarm/FishFarmSection";

function HomeScreen() {
  return (
    <div>
      <TopBar />
      <FishFarmSection />
    </div>
  );
}

export default HomeScreen;
