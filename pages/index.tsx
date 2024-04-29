import Users from "components/users";
import React from "react";
import Posts from "../components/posts";

export type TPost = {
  id: string;
  title: string;
  body: string;
  userId: string;
};
export type TPostProps = {
  posts: TPost[];
};

// This gets called on every request
export async function getServerSideProps() {
  // Example logic block. May be FEATURE_TOGGLE or AUTHORISATION_CHECK or etc.
  try {
    // Fetch data from external API
    const posts: TPost[] = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=2",
    ).then((response) => response.json());
    // Pass data to the page via props
    return { props: { posts } };
  } catch ({ message }) {
    console.error(message);
    // Pass data to the page via props
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
}

const Index: React.FC<TPostProps> = ({ posts }) => {
  // console.log("FIND Index");
  return (
    <div>
      <h1>Protected page</h1>
      <Posts posts={posts} />
      <Users />
    </div>
  );
};

export default Index;
