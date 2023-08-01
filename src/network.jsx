import React from "react";
import { Dialog, DialogContent, Box, Slide, Button } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function NetworkChange({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const networkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        // params: [{ chainId: "0x38" }], //BSC mainnet
        params: [{ chainId: "0x13881" }], //polygone testnet
        // params: [{ chainId: "0x61" }], //BSC testnet
        // params: [{ chainId: "0x5" }], //Ethereum  Testnet
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="modal__main__container">
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent
            sx={{ backgroundColor: "primary.main" }}
            className="dialoge__content__section"
          >
            <Box component="h3" color="text.primary">
              <Box component="span" color="red" fontSize="30px">
                Error!
              </Box>{" "}
              You are on wrong network please switch your network.
            </Box>
            <Box align="center">
              <Button
                variant="button"
                sx={{ py: 1.5, width: "180px" }}
                onClick={networkHandler}
              >
                Switch Network
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default NetworkChange;
