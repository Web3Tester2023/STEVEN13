import React, { useContext } from "react";
import {
  Container,
  Hidden,
  useMediaQuery,
  SwipeableDrawer,
  Button,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import logo from "../Images/logo.png";

import { AppContext } from "../utils";
import { StyledButton } from "./SmallComponents/AppComponents";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
    alignItems: "center",
  },
  paper: {
    background: "#2760A0 !important",
  },
  hover: {
    "&:hover": {
      color: "#FFB800",
    },
  },
});

export default function Header() {
  const { account, connect, disconnect } = useContext(AppContext);
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const matches1 = useMediaQuery("(max-width:1279px)");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          mt: 5,
        }}
      >
        <img
          src={logo}
          alt=""
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
          }}
        />
        <Typography
          sx={{
            color: "#fff",
            textAlign: "center",
            fontSize: "12px",
            mt: 1,
          }}
        >
          Uberwolf capital
        </Typography>
      </Box>

      <Box mb={1} mt={5} display="flex" justifyContent="center">
        {account ? (
          <StyledButton width="90%" onClick={() => disconnect()}>
            {account.slice(0, 4) + "..." + account.slice(-4)}
          </StyledButton>
        ) : (
          <StyledButton width="90%" onClick={() => connect()}>
            Connect
          </StyledButton>
        )}
      </Box>
    </div>
  );
  return (
    <>
      <Box
        sx={{
          background: "transparent",
        }}
        height="92px"
        width="100%"
        py={1}
      >
        <Container maxWidth="xl">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <img
                src={logo}
                alt=""
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />
              <Typography
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: "13px",
                  pr: 3,
                }}
              >
                Uberwolf Capital
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent={matches1 ? "end" : "space-between"}
              alignItems="center"
            >
              <Hidden mdDown>
                {account ? (
                  <StyledButton width="150px" onClick={() => disconnect()}>
                    {account.slice(0, 4) + "..." + account.slice(-4)}
                  </StyledButton>
                ) : (
                  <StyledButton width="150px" onClick={() => connect()}>
                    Connect
                  </StyledButton>
                )}
              </Hidden>

              <Hidden mdUp>
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button
                      onClick={toggleDrawer(anchor, true)}
                      style={{ zIndex: 1 }}
                    >
                      <MenuIcon
                        style={{
                          fontSize: "38px",
                          cursor: "pointer",
                          color: "#fff",
                        }}
                      ></MenuIcon>
                    </Button>
                    <Paper>
                      <SwipeableDrawer
                        classes={{ paper: classes.paper }}
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                      >
                        {list(anchor)}
                      </SwipeableDrawer>
                    </Paper>
                  </React.Fragment>
                ))}
              </Hidden>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
