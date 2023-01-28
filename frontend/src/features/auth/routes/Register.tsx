import Alert, { AlertColor } from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
// import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

export const Register = () => {
  const [modalState, setModalState] = useState<{
    open: boolean;
    detail: string;
    severity: AlertColor;
  }>({ open: false, detail: "", severity: "success" });

  const { loading } = useAuth();

  // const mutation = useMutation(login, {
  //   onError: (e) =>
  //     setModalState({
  //       open: true,
  //       detail: `Could not log in. Please try again later.`,
  //       severity: "error",
  //     }),
  // });

  const handleModalClose = () => {
    setModalState({ ...modalState, open: false });
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          maxWidth: "400px",
          minWidth: "250px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <RegisterForm
          onRegister={(message: string) => {
            setModalState({
              open: true,
              detail: message,
              severity: "error",
            });
          }}
        />
      </Box>
      <Snackbar
        autoHideDuration={6000}
        open={modalState.open}
        onClose={handleModalClose}
      >
        <Alert
          severity={modalState.severity}
          sx={{ width: "100%" }}
          onClose={() => {
            // mutation.reset();
          }}
        >
          {modalState.detail}
        </Alert>
      </Snackbar>
    </Box>
  );
};
