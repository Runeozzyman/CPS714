"use client";
import { Fragment, useEffect, useState } from "react";
import { UsernameMessage } from "../interfaces/UsernameMessage";

export default function Username() {
  const [message, setMessage] = useState<UsernameMessage | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch("http://127.0.0.1:8080/api/username", {
        cache: "no-store",
      });
      const data: UsernameMessage = await response.json();
      setMessage(data);
    };

    fetchMessage();
  }, []);

  if (!message) {
    return <Fragment>Loading...</Fragment>;
  }

  return (
    <Fragment>
      {message.message ? (
        <Fragment>{message.message}</Fragment>
      ) : (
        <Fragment>Welcome: {message.username}</Fragment>
      )}
    </Fragment>
  );
}
