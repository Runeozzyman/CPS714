import React, { Fragment } from "react";
import { Message } from "../interfaces/message";
import { Users } from "../interfaces/users";
import Username from "../components/UserName";

const Home = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const users: Users[] = await res.json();
  const message = await fetch("http://127.0.0.1:8080/api/home", {
    cache: "no-store",
  });
  const mess: Message = await message.json();
  console.log(mess);
  return (
    <Fragment>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <h1 className="text-4xl font-bold text-black">
          Successful Login <br />
          <Username />
          <br />
          {mess.message}
        </h1>
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
                Address = {user.address.street}, {user.address.suite},
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
