import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getMyPosts } from "../store/posts";
import "./Posts.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#c8e9eb",
    width: "100%",
    padding: "20px",
  },

  card: {
    margin: "30px 15px",
    padding: theme.spacing(2),
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const MyPosts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  // const myPosts = () => {
  //   posts.filter((post) => post.userId === localStorage.getItem("userId"););
  // };
  // if (posts) {
  //   myPosts();
  // }

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
          <Grid key={post.postId} item xs={12} sm={6}>
            <Card className={classes.card}>
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
                  <span style={{ fontSize: ".8em", marginRight: "5px" }}>
                    {post.likes}
                  </span>
                </CardActions>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyPosts;
