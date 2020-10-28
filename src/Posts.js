import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "./store/posts";

const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  });

  const posts = useSelector((state) => state.posts.posts);
  if (!posts) {
    return null;
  }
  return (
    <div>
      {posts.map((post) => (
        <>
          <img alt={post.caption} key={post.id} src={post.imageUrl}></img>
          <span>{post.caption}</span>
        </>
      ))}
    </div>
  );
};

export default Posts;
