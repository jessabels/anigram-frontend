import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost, getMyPosts } from "../store/posts";
import "./Posts.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#c8e9eb82",
    width: "100%",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },

  card: {
    margin: "30px 15px",
    padding: theme.spacing(2),
  },

  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

const MyPosts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
    handleClose();
  };
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  if (!posts) {
    return <CircularProgress />;
  } else if (posts.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#c8e9eb",
          padding: "30px 38px",
          width: "100%",
          maxWidth: "500px",
          border: "1px solid #dddd",
          textAlign: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>No posts yet!</h1>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <h3 style={{ textAlign: "center" }}>My Posts</h3>
      <Grid container>
        {posts.map((post) => (
          <React.Fragment key={post.postId}>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar alt="user avatar" src={post.userAvatar}></Avatar>
                  }
                  subheader={post.createdAt}
                  action={
                    <IconButton onClick={handleClickOpen}>
                      <DeleteIcon />
                    </IconButton>
                  }
                />
                <CardMedia className={classes.media} image={post.imageUrl} />
                <div className="photo-text-container">
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {post.caption}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <span style={{ fontSize: ".8em", marginRight: "5px" }}>
                      {post.likes} likes
                    </span>
                  </CardActions>
                </div>
              </Card>
            </Grid>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this post?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => handleDeletePost(post.postId)}
                  color="primary"
                >
                  Yes
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
};

export default MyPosts;
