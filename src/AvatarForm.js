import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { updateAvatar } from "./store/authentication";

const useStyles = makeStyles((theme) => ({
  img: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    cursor: "pointer",
  },
  selectedImg: {
    // border: "1px solid black",
    borderStyle: "solid",
    borderWidth: "3px",
    borderColor: theme.palette.secondary.main,
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const AvatarForm = (props) => {
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const submitAvatar = (e) => {
    e.preventDefault();
    dispatch(updateAvatar(selectedAvatar));
    setSelectedAvatar("");
    props.onClose();
  };

  const selectAvatar = (imgSrc) => {
    setSelectedAvatar(imgSrc);
  };

  const handleCancel = () => {
    setSelectedAvatar("");
    props.onClose();
  };

  const classes = useStyles();

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose Your Avatar</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6} sm={4}>
              <Avatar
                src="https://anigram-images.s3.amazonaws.com/avatars/bear.PNG"
                className={
                  selectedAvatar ===
                  "https://anigram-images.s3.amazonaws.com/avatars/bear.PNG"
                    ? classes.selectedImg
                    : classes.img
                }
                onClick={(e) => selectAvatar(e.target.currentSrc)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Avatar
                src="https://anigram-images.s3.amazonaws.com/avatars/cat.PNG"
                className={
                  selectedAvatar ===
                  "https://anigram-images.s3.amazonaws.com/avatars/cat.PNG"
                    ? classes.selectedImg
                    : classes.img
                }
                onClick={(e) => selectAvatar(e.target.currentSrc)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Avatar
                src="https://anigram-images.s3.amazonaws.com/avatars/fox.PNG"
                className={
                  selectedAvatar ===
                  "https://anigram-images.s3.amazonaws.com/avatars/fox.PNG"
                    ? classes.selectedImg
                    : classes.img
                }
                onClick={(e) => selectAvatar(e.target.currentSrc)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Avatar
                src="https://anigram-images.s3.amazonaws.com/avatars/frog.PNG"
                className={
                  selectedAvatar ===
                  "https://anigram-images.s3.amazonaws.com/avatars/frog.PNG"
                    ? classes.selectedImg
                    : classes.img
                }
                onClick={(e) => selectAvatar(e.target.currentSrc)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Avatar
                src="https://anigram-images.s3.amazonaws.com/avatars/monkey.PNG"
                className={
                  selectedAvatar ===
                  "https://anigram-images.s3.amazonaws.com/avatars/monkey.PNG"
                    ? classes.selectedImg
                    : classes.img
                }
                onClick={(e) => selectAvatar(e.target.currentSrc)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Avatar
                src="https://anigram-images.s3.amazonaws.com/avatars/pug.PNG"
                className={
                  selectedAvatar ===
                  "https://anigram-images.s3.amazonaws.com/avatars/pug.PNG"
                    ? classes.selectedImg
                    : classes.img
                }
                onClick={(e) => selectAvatar(e.target.currentSrc)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={submitAvatar} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AvatarForm;
