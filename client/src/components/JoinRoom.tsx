import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { closeDialog } from "../features/dialogSlide";
import TextField from "@material-ui/core/TextField";
import styles from "../styles/JoinRoom.module.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";
import { setAudio, setVideo } from "../features/controlsSlice";

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

export const JoinRoom: React.FC<any> = (props) => {
  const [input, setInput] = useState<string>("");
  const [audio, setCurrentAudio] = useState<boolean>(true);
  const [video, setCurrentVideo] = useState<boolean>(true);

  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeDialog());
  };

  const join = () => {
    dispatch(setAudio({ audio }));
    dispatch(setVideo({ video }));
    props.history.push(`/room/${input}`);
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
