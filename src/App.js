import { Box } from "@mui/material";
import "./App.css";
import Header from "./Components/Header";
import HeroSection from "./Pages/HeroSection";
import background from "./Images/background.jpg";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./utils";
import NetworkChange from "./network";

function App() {
  const { account, chainId } = useContext(AppContext);
  const [networkModal, setNetworkModal] = useState(false);
  useEffect(() => {
    if (account) {
      console.log(chainId, "=================>>>>");
      if (chainId !== 80001) setNetworkModal(true);
    }
  }, [chainId, account]);
  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        width: "100%",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        opacity: 0.9,
        pb: 5,
      }}
    >
      <NetworkChange open={networkModal} setOpen={setNetworkModal} />
      <Header />
      <HeroSection />
    </Box>
  );
}

export default App;
