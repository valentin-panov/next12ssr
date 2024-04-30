import Users from "components/users";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
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
type TCookies = {
  [key: string]: string;
};

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Example logic block. May be FEATURE_TOGGLE or AUTHORISATION_CHECK or etc.

  // Get cookies and try to find the token
  const cookiesString = context.req.headers.cookie;
  const cookies: TCookies = {};
  cookiesString &&
    cookiesString.split(";").forEach((cookie: string) => {
      const [key, value] = cookie.split("=").map((c) => c.trim());
      cookies[key] = value;
    });
  const token = cookies["auth-token"];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Fetch data from external API
  try {
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
  const [role, setRole] = React.useState<string>("user");
  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  const logout = () => {
    localStorage.removeItem("role");
    document.cookie = "auth-token=; Max-Age=-99999999;";
    window.location.href = "/";
  };
  return (
    <div>
      <h1>Protected page</h1>
      <button onClick={logout}>Logout</button>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Posts posts={posts} />
        <div>
          Your role: {role}
          {role === "admin" && <Users />}
        </div>
      </div>
    </div>
  );
};

export default Index;
