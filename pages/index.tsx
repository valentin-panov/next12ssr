import Users from "components/users";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import Products from "../components/products";
import * as process from "node:process";
import { TProduct, TProductProps, TProfileResponse } from "types";
import { getCookieRole, headerCookieParse, logout } from "utils";

// This gets called on every request on the server side
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // Example logic block. May be FEATURE_TOGGLE or AUTHORISATION_CHECK or etc.

  // Get cookies and try to find the token
  const cookies = headerCookieParse(context.req.headers.cookie);
  const token = cookies["access_token"];
  // only authorised user may access the page
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const response: TProfileResponse = await fetch(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((response) => response.json());
    // case of invalid token came from the frontend side
    if (response.statusCode == 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      context.res.setHeader(
        "Set-Cookie",
        `role=${response.role}; SameSite=Strict; Secure`,
      );
    }
  }

  // Fetch data from external API
  try {
    const products: TProduct[] = await fetch(
      "https://api.escuelajs.co/api/v1/products?offset=0&limit=3",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          PAYED_SUBSCRIPTION_TOKEN: `${process.env.PAYED_SUBSCRIPTION_TOKEN}`,
        },
      },
    ).then((response) => response.json());
    // Pass data to the page via props
    return { props: { products } };
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
};

// This is the client side logic
const Index: React.FC<TProductProps> = ({ products }) => {
  console.log("FIND_ME_Index");
  const [role, setRole] = React.useState<string>("customer");
  useEffect(() => {
    setRole(getCookieRole());
  }, []);

  const switchRole = () => {
    const settedRole = getCookieRole();
    if (settedRole !== "admin") {
      setRole("admin");
      document.cookie = "role=admin; SameSite=Strict; Secure";
    } else {
      setRole("customer");
      document.cookie = "role=customer; SameSite=Strict; Secure";
    }
  };

  return (
    <div>
      <h1>Protected page</h1>
      <button onClick={logout}>Logout</button>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Products products={products} />
        <div>
          <p>Your role: {role}</p>
          <button onClick={switchRole}>Switch role</button>
          {role === "admin" && <Users />}
        </div>
      </div>
    </div>
  );
};

export default Index;
