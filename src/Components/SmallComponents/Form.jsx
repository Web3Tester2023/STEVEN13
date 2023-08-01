import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";

// import { Link, useNavigate } from "react-router-dom";

import Loading from "./loading";
import Toastify from "./Tostify";
import { AppContext } from "../../utils";
import {
  usePresaleContract,
  useTokenContract,
} from "../../ConnectivityAssets/hooks";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { presaleAdress } from "../../ConnectivityAssets/environment";

const validationSchema = yup.object({
  bnb: yup.string("Enter your BNB").required("BNB is required"),
  rate: yup.string("Enter BNB for rate"),
});

export const Form = () => {
  const { account, connect, signer, balance } = useContext(AppContext);
  const tokenContract = useTokenContract(signer);
  const presaleContract = usePresaleContract(signer);
  const [maticRaised, setMaticRaised] = useState(0);
  const [tokenBalance, settokenBalance] = useState(0);
  const [rate, setrate] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const showToast = (msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  };
  // ================================read functions ===================================
  const init = useCallback(async () => {
    try {
      const matic = await presaleContract.weiRaised();
      setMaticRaised(formatUnits(matic));
      const rateR = await presaleContract.rate();
      console.log(formatUnits(rateR), "jasjajsj");
      setrate(formatUnits(rateR));
    } catch (error) {
      console.log(error);
    }
  }, [presaleContract]);

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

  // ===================================buy =====================================

  const formik = useFormik({
    initialValues: {
      bnb: "",
      rate: "296 PER MATIC",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const { bnb } = values;
      if (isNaN(Number(bnb))) {
        setAlertState({
          open: true,
          message: "Invalid input!",
          severity: "error",
        });
        return;
      }
      if (Number(bnb) < 0.1) {
        setAlertState({
          open: true,
          message: "The minimum amount to buy is 0.1 MATIC!",
          severity: "error",
        });
        return;
      }
      try {
        setLoading(true);
        const tx = await presaleContract.buyTokens(account, {
          value: parseUnits(bnb),
        });

        await tx.wait();
        init();
        initAcc();
        setLoading(false);
        showToast("Transaction Completed!", "success");
      } catch (error) {
        setLoading(false);
        if (error?.data?.message) {
          showToast(error?.data?.message, "error");
        } else if (error?.reason) {
          showToast(error?.reason, "error");
        } else {
          showToast(error?.message, "error");
        }
      }
    },
  });

  return (
    <>
      <Loading isLoading={loading} />
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Box
        sx={{
          width: "100%",
          borderRadius: "10px",
          py: { xs: 0, md: 5 },
          // color: "#fff",
        }}
      >
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px 0px",
              width: "100%",
              mx: "auto",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Enter MATICAL"
              variant="outlined"
              type="text"
              placeholder="Enter MATIC"
              name="bnb"
              value={formik.values.bnb}
              onChange={formik.handleChange}
              error={formik.touched.bnb && Boolean(formik.errors.bnb)}
              helperText={formik.touched.bnb && formik.errors.bnb}
              required={true}
              sx={{
                fontFamily: "Rubik",
                "& label.Mui-focused": {
                  color: "#fff",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#fff",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                  },
                },

                "&::placeholder": {
                  textOverflow: "ellipsis !important",
                  color: "#fff",
                },

                input: {
                  color: "white",
                  fontSize: { xs: "12px", md: "14px" },
                },
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Rate"
              name="rate"
              InputProps={{
                readOnly: true,
              }}
              value={formik.values.rate}
              onChange={formik.handleChange}
              error={formik.touched.rate && Boolean(formik.errors.rate)}
              helperText={formik.touched.rate && formik.errors.rate}
              sx={{
                fontFamily: "Rubik",
                "& label.Mui-focused": {
                  color: "#fff",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#fff",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                  },
                },

                "&::placeholder": {
                  textOverflow: "ellipsis !important",
                  color: "#fff",
                },

                input: {
                  color: "#000",
                  fontSize: { xs: "12px", md: "14px" },
                },
              }}
            />

            {account ? (
              <Button
                type="submit"
                onClick={formik.handleSubmit}
                sx={{
                  fontFamily: "Rubik",
                  background:
                    "radial-gradient(145.24% 943.2% at 7.91% 50%, #1c85fe91 0%, #be4bc870 40%)",
                  "&:hover": {
                    background:
                      "radial-gradient(145.24% 943.2% at 7.91% 50%, #be4bc870 0%, #1c85fe91 40%)",
                  },
                  boxShadow: "20px 14px 19px rgba(0, 0, 0, 0.25)",
                  borderRadius: "4px",

                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#FFFFFF",
                  px: 7,
                  py: 1,
                  width: { xs: "100%" },
                }}
              >
                Buy
              </Button>
            ) : (
              <Button
                onClick={connect}
                sx={{
                  background:
                    "radial-gradient(145.24% 943.2% at 7.91% 50%, #1c85fe91 0%, #be4bc870 40%)",
                  "&:hover": {
                    background:
                      "radial-gradient(145.24% 943.2% at 7.91% 50%, #be4bc870 0%, #1c85fe91 40%)",
                  },
                  boxShadow: "20px 14px 19px rgba(0, 0, 0, 0.25)",
                  borderRadius: "4px",
                  fontFamily: "Rubik",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#FFFFFF",
                  px: 7,
                  py: 1,
                  width: { xs: "100%" },
                }}
              >
                Connect
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
};
