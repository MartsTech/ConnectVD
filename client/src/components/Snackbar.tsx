import SnackbarUi from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar, selectSnackbar } from "../features/snackbarSlice";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

interface SnackbarProps {
  message: string;
  status: "error" | "warning" | "info" | "success";
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, status }) => {
  const opened = useSelector(selectSnackbar);

  const dispatch = useDispatch();

  return (
    <SnackbarUi
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={opened}
      onClose={() => dispatch(closeSnackbar())}
      autoHideDuration={3000}
    >
      <Alert onClose={() => dispatch(closeSnackbar())} severity={status}>
        {message}
      </Alert>
    </SnackbarUi>
  );
};
