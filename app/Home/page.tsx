import React, { Fragment } from "react";

interface geo {
  lat: number;
  lng: number;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: geo;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  address: Address;
}

const Home = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const users: Users[] = await res.json();

  return (
    <Fragment>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <h1 className="text-4xl font-bold text-black">Successful Login</h1>
        <br />
      </div>
      <h1>List of Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <br />
            Name = {user.name}, Username = {user.username}
            <br />
            <ul>
              <li>{user.password}</li>
              <li style={{ paddingLeft: "15px" }}>
                Email = {user.email}
                <br />
                Address = {user.address.street}, {user.address.suite},{" "}
                {user.address.city}
                <br />
                Zipcode = {user.address.zipcode}
                <br />
                Geo Location = {user.address.geo.lat}, {user.address.geo.lng}
              </li>
              <li>{}</li>
            </ul>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
export default Home;