import React, { useEffect } from "react";

type TUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const Users: React.FC = () => {
  console.log("FIND_ME_Users");
  const [users, setUsers] = React.useState<TUser[]>([]);

  // Fetch data from external API
  useEffect(() => {
    try {
      fetch("https://jsonplaceholder.typicode.com/users?_start=0&_limit=2")
        .then((response) => response.json())
        .then((data) => setUsers(data));
    } catch ({ message }) {
      console.error(message);
    }
  }, []);

  return (
    <div style={{ width: "20vw" }}>
      <h2>Restricted Access Area</h2>
      <h3>Users</h3>
      {users.map((user: TUser) => (
        <div key={user.id}>
          <h4>ID: {user.id}</h4>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
