import * as React from "react";
import BottomBar from "../../molecules/bottomBar/BottomBar";
import WorkerTable from "../../molecules/worker/WorkerTable";

function WorkerSection() {
  return (
    <div>
      <WorkerTable />
      <BottomBar route="addWorker" />
    </div>
  );
}

export default WorkerSection;
