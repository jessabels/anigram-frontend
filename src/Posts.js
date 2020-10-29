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
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

import { getAllPosts } from "./store/posts";
import "./Posts.css";
import Like from "./Like";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "30px 15px",
    backgroundColor: "#9cd8dc8f",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  card: {
    padding: theme.spacing(2),
  },
}));

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  // const likes = useSelector((state) => state.authentication.likes);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const classes = useStyles();

  if (!posts) {
    return <CircularProgress />;
  }

  // const handleLike = (postId) => {
  //   console.log(postId);
  // };

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
                  {/* <FontAwesomeIcon
                    onClick={() => handleLike(post.postId)}
                    icon={faLeaf}
                    style={
                      likes && likes.includes(post.postId)
                        ? { color: "rgb(74, 165, 50)", cursor: "pointer" }
                        : { color: "rgb(74 165 50 / 41%)", cursor: "pointer" }
                    }
                  ></FontAwesomeIcon> */}
                  <Like postId={post.postId} />
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
