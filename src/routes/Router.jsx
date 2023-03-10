import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import TopBar from "../components/molecules/topBar/TopBar";
import FishFarmSection from "../components/organisms/fishFarm/FishFarmSection";
import HomeScreen from "../components/organisms/homeScreen/HomeScreen";
import Login from "../components/organisms/login/Login";
import WorkerSection from "../components/organisms/workers/WorkerSection";
import AddFarm from "../components/organisms/fishFarm/addFarm/AddFarm";
import EditFarm from "../components/organisms/fishFarm/editFarm/EditFarm";
import AddWorker from "../components/organisms/workers/addWorker/AddWorker";
import EditWorker from "../components/organisms/workers/editWorker/EditWorker";

export function Router() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/farms" element={<FishFarmSection />} />
        <Route path="/farms/addFarm" element={<AddFarm />} />
        <Route path="/farms/editFarm" element={<EditFarm />} />
        <Route path="/workers" element={<WorkerSection />} />
        <Route path="/workers/addWorker" element={<AddWorker />} />
        <Route path="/workers/editWorker" element={<EditWorker />} />
      </Routes>
    </BrowserRouter>
  );
}
