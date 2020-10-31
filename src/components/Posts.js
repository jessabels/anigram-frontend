import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import { getAllPosts } from "../store/posts";
import "./Posts.css";
import Like from "./Like";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "345px",
    margin: "30px 15px",
    backgroundColor: theme.palette.secondary.main,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  card: {
    padding: theme.spacing(2),
  },
}));

const Posts = (props) => {
  const { newPostLoading, setNewPostLoading } = props;

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, newPostLoading]);

  // useEffect(() => {
  //   setNewPostLoading(false);
  // }, [dispatch, newPostLoading]);

  const classes = useStyles();

  if (!posts) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid container>
        {posts.map((post) => (
          <Grid key={post.postId} item xs={6} sm={3}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar alt="user avatar" src={post.userAvatar}></Avatar>
                }
                subheader={post.createdAt}
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
                  <Like likes={post.likes} postId={post.postId} />
                </CardActions>
              </div>
            </Card>
          </Grid>
        ))}

        {/* {newPostLoading ? (
          <Skeleton variant="rect" width={345} height={345}></Skeleton>
        ) : null} */}
      </Grid>
    </>
  );
};

export default Posts;
