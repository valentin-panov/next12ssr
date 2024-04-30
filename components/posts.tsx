import { TPost, TPostProps } from "pages";
import React from "react";

const Posts: React.FC<TPostProps> = ({ posts }) => {
  // console.log("FIND Posts");
  return (
    <div style={{ width: "20vw" }}>
      <h2>Posts</h2>
      {posts.map((post: TPost) => (
        <div key={post.id}>
          <h3>ID: {post.id}</h3>
          <p>Title: {post.title}</p>
          <p>Post Body: {post.body}</p>
          <p>UserID: {post.userId}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
