import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import TopBar from "../components/molecules/topBar/TopBar";
import FishFarmSection from "../components/organisms/fishFarm/FishFarmSection";
import HomeScreen from "../components/organisms/homeScreen/HomeScreen";
import Login from "../components/organisms/login/Login";
import WorkerSection from "../components/organisms/workers/WorkerSection";

export function Router() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/farms" element={<FishFarmSection />} />
        <Route path="/workers" element={<WorkerSection />} />
      </Routes>
    </BrowserRouter>
  );
}
