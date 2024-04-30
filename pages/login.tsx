import React from "react";

const Login: React.FC = () => {
  // console.log('FIND_ME_Login')
  const onClick = () => {
    document.cookie = "auth-token=0010; SameSite=Strict; Secure";
    document.cookie = "role=user; SameSite=Strict; Secure";
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
