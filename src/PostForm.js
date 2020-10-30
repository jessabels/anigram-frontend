import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { createPost } from "./store/posts";

const PostForm = (props) => {
  const { setNewPostLoading } = props;
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("caption", caption);

    dispatch(createPost(data));
    setCaption("");
    props.onClose();
    setNewPostLoading(true);
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
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
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
