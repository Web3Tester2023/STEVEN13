import React from "react";
import { Backdrop } from "@mui/material";
import { HashLoader } from "react-spinners";
const Loading = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <HashLoader color="#4CD3BD" size={100} />
    </Backdrop>
  );
};

export default Loading;
