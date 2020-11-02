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

import { getAllPosts } from "../store/posts";
import "./Posts.css";
import Like from "./Like";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "345px",
    margin: "30px 15px",
    backgroundColor: "#c8e9eb82",
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
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

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
                subheader={post.user}
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
      </Grid>
    </>
  );
};

export default Posts;
