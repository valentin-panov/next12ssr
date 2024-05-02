import React from "react";

const auth = async () => {
  const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: "john@mail.com",
      password: "changeme",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const Login: React.FC = () => {
  console.log("FIND_ME_Login");
  const onClick = async () => {
    const { access_token } = await auth();
    document.cookie = `access_token=${access_token}; SameSite=Strict; Secure`;
    window.location.href = "/";
  };
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
      <h1>Login Page</h1>
      <button onClick={onClick}>User login</button>
    </div>
  );
};

export default Login;
