import React from "react";
import { GetServerSidePropsContext } from "next";
import { TCookies } from "./index";

const Admin: React.FC = () => {
  console.log("FIND_ME_Admin");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Admin Space</h1>
      <button onClick={() => (window.location.href = "/")}>
        Back to index
      </button>
    </div>
  );
};

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
  const token = cookies["access_token"];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const role = cookies["role"];
  if (role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default Admin;
