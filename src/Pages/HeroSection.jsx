import { Box, Container, Typography } from "@mui/material";

import { Form } from "../Components/SmallComponents/Form";
import DownCounter from "../Components/SmallComponents/Counter";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../utils";
import {
  usePresaleContract,
  useTokenContract,
} from "../ConnectivityAssets/hooks";
import { formatUnits } from "@ethersproject/units";
import Loading from "../Components/SmallComponents/loading";

export default function HeroSection() {
  const [loading, setLoading] = useState(false);

  const { account, signer, balance } = useContext(AppContext);
  const tokenContract = useTokenContract(signer);
  const presaleContract = usePresaleContract(signer);
  const [tokenData, setTokenData] = useState({
    name: " ....",
    Symbol: " ...",
    totalSuply: "... ",
  });
  const [tokenBalance, settokenBalance] = useState(0);
  const [maticRaised, setMaticRaised] = useState(0);

  console.log("tokenContracts", tokenContract);

  const init = useCallback(async () => {
    try {
      setLoading(true);
      const matic = await presaleContract.weiRaised();
      setMaticRaised(formatUnits(matic));
      const tName = await tokenContract.name();
      const symbol = await tokenContract.symbol();
      const tSupply = await tokenContract.totalSupply();

      setTokenData({
        name: tName,
        Symbol: symbol,
        totalSuply: formatUnits(tSupply),
      });
      setLoading(false);
      // console.log(formatUnits(rateR), "jasjajsj");
      // setrate(formatUnits(rateR));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [presaleContract, tokenContract]);

  const initAcc = useCallback(async () => {
    try {
      const tokenBal = await tokenContract.balanceOf(account);
      settokenBalance(formatUnits(tokenBal));
    } catch (error) {
      console.log(error);
    }
  }, [account, tokenContract]);

  useEffect(() => {
    init();
    if (account) {
      initAcc();
    }
  }, [account, init, initAcc]);

  const array = [
    {
      name: "Name",
      // value: tokenData?.name,
      value: "Uberwolf Capital",
    },
    {
      name: "Symbol",
      // value: tokenData?.Symbol,
      value: "Uberwolf Capital ",
    },
    {
      name: "Total Supply",
      // value: tokenData?.totalSuply,
      value: "10,000,000,000",
    },
    {
      name: "NetWork",
      value: "Polygon",
    },
    {
      name: "Exchange Rate",
      value: ` $0.0025 = ${tokenData?.name}`,
    },
    // {
    //   name: "MATIC Balance",
    //   value: Number(balance)?.toFixed(4) ?? 0,
    // },
    // {
    //   name: " Uberwolf Capital",
    //   value: Number(tokenBalance)?.toFixed(4) ?? 0,
    // },
    {
      name: "MATIC Raised",
      value: Number(maticRaised)?.toFixed(4) ?? 0,
    },
  ];
  return (
    <Box>
      <Loading isLoading={loading} />
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "3rem" },
            fontWeight: "600",
            textAlign: "center",
            color: "#fff",
            fontFamily: "Rubik",
          }}
        >
          Uberwolf Capital
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            border: "2px solid #fff",
            p: { xs: 2, md: 5 },
            mt: { xs: 0, md: 5 },
            gap: "30px 0px",
            borderRadius: "10px",
            width: { xs: "100%", sm: "70%", md: "80%" },
            mx: "auto",
            backdropFilter: "blur(8px)",
            boxSizing: "border-box",
            fontFamily: "Rubik",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "10px 0px",
              width: { xs: "100%", md: "45%" },
            }}
          >
            <Box
              sx={{
                color: "#fff",
                mt: { xs: 2, md: 6 },

                width: "100%",
              }}
            >
              <Typography
                sx={{
                  // border: "1px solid red",
                  fontFamily: "Rubik",
                  textAlign: "center",
                  p: 1,
                  borderRadius: "8px 8px 0px 0px",
                  background:
                    "radial-gradient(145.24% 943.2% at 7.91% 50%, #1c85fe91 0%, #be4bc870 40%)",
                  "&:hover": {
                    background:
                      "radial-gradient(145.24% 943.2% at 7.91% 50%, #be4bc870 0%, #1c85fe91 40%)",
                  },
                }}
              >
                Uberwol Capital
              </Typography>
              <Typography
                sx={{
                  // border: "1px solid red",
                  fontFamily: "Rubik",
                  textAlign: "center",
                  color: "#000",
                  p: 1,
                  borderRadius: "0px 0px 8px 8px",
                  background: "#ffff",
                }}
              >
                JOIN THE PRESALE
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              {" "}
              <DownCounter />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Rubik",
                  fontWeight: "bold",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                Start Date : <span style={{ color: "#fff" }}>July 1, 2023</span>
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Rubik",
                  fontWeight: "bold",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                End Date :{" "}
                <span style={{ color: "#fff" }}> September, 01, 2023</span>
              </Typography>
            </Box>
            <Box
              sx={{
                fontFamily: "Rubik",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {array.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      color: "#fff",
                      mt: { xs: 2, md: 2 },
                      // border: "2px solid red",
                      width: "45%",
                    }}
                  >
                    <Typography
                      sx={{
                        // border: "1px solid red",
                        textAlign: "center",
                        fontFamily: "Rubik",
                        fontSize: { xs: "14px", md: "15px" },
                        px: 1,
                        borderRadius: "8px 8px 0px 0px",
                        background:
                          "radial-gradient(145.24% 943.2% at 7.91% 50%, #1c85fe91 0%, #be4bc870 40%)",
                        "&:hover": {
                          background:
                            "radial-gradient(145.24% 943.2% at 7.91% 50%, #be4bc870 0%, #1c85fe91 40%)",
                        },
                      }}
                    >
                      {item?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "14px", md: "15px" },
                        textAlign: "center",
                        color: "#000",
                        px: 1,
                        borderRadius: "0px 0px 8px 8px",
                        background: "#ffff",
                        fontFamily: "Rubik",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "45%" } }}>
            <Form />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
