import * as React from "react";
import BottomBar from "../../molecules/bottomBar/BottomBar";
import FishFarmTable from "../../molecules/fishFarm/FishFarmTable";

function FishFarmSection() {
  return (
    <div>
      <FishFarmTable />
      <BottomBar route="addFarm" />
    </div>
  );
}

export default FishFarmSection;
