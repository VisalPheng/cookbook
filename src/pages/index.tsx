import { Stack } from "@mui/material";
import React from "react";
import Recipe from "./Recipe";

const Home: React.FC = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent={"center"}
      sx={{ width: "100vw", height: "100vh" }}
    >
      <Recipe />
    </Stack>
  );
};

export default Home;
