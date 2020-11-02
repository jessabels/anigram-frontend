import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress } from "@material-ui/core";

import { createPost } from "../store/posts";
import { handleErrors } from "../store/authentication";

const PostForm = (props) => {
  let errors = useSelector((state) => state.authentication.errors);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();

  const listOfErrors = errors
    ? errors.map((error) => (
        <li key={error} style={{ color: "red" }}>
          {error}
        </li>
      ))
    : null;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("caption", caption);
    await dispatch(createPost(data));
    setLoading(false);
    setCaption("");
    if (image && caption) {
      props.onClose();
    }
  };
  const onCancel = () => {
    dispatch(handleErrors([]));
    props.onClose();
  };
  const updateCaption = (e) => {
    setCaption(e.target.value);
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Upload a Photo</DialogTitle>
      {loading ? <CircularProgress /> : null}
      <DialogContent>
        <TextField
          autoFocus
          name="file"
          margin="dense"
          id="fileUpload"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          fullWidth
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="caption"
          name="caption"
          value={caption}
          onChange={updateCaption}
          label="Caption"
          type="text"
          fullWidth
          required
        />
      </DialogContent>

      <ul>{listOfErrors}</ul>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
