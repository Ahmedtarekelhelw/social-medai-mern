import Navbar from "../components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
