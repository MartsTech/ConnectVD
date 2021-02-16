import { Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setAudio, setVideo } from "../../features/controlsSlice";
import { closeDialog } from "../../features/dialogSlice";
import styles from "../../styles/JoinRoom.module.css";

const PaperComponent: React.FC = (props: PaperProps) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

export const JoinRoom: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [audio, setCurrentAudio] = useState<boolean>(true);
  const [video, setCurrentVideo] = useState<boolean>(true);

  const history = useHistory();

  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeDialog());
  };

  const join = () => {
    dispatch(setAudio({ audio }));
    dispatch(setVideo({ video }));
    history.push(`/room/${input}`);
    close();
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={() => close()}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <div className={styles.joinRoom}>
          <DialogTitle
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
            className={styles.title}
          >
            Join Meeting
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Enter meeting Id"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
            />
            <div className={styles.checkboxContainer}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label={"Do not connect to audio"}
                onClick={() => setCurrentAudio(!audio)}
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label={"Turn off my video"}
                onClick={() => setCurrentVideo(!video)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => join()} color="primary">
              <h4>Join</h4>
            </Button>
            <Button autoFocus onClick={() => close()} color="primary">
              <h4>Cancel</h4>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};
