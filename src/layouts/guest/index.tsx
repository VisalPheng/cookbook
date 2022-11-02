import { Stack } from "@mui/material";
import ThemeModeMenu from "components/ThemeModeMenu";
import React from "react";
import { Outlet } from "react-router-dom";

const GuestLayout = ({ children }) => {
  return <>{children}</>;
};

export default GuestLayout;
