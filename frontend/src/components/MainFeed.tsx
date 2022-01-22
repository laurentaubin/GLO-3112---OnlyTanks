import React from "react";
import { useHelloWord } from "../hooks/useHelloWorld";

export const MainFeed = () => {
  const { helloWorld, state } = useHelloWord();

  return (
    <div className="text-3xl text-green-300">
      {state === "loading" && <p>loading...</p>}
      {state === "error" && <p>Whoops, there was an error reaching the server</p>}
      {state === "success" && <p>{helloWorld}</p>}
    </div>
  );
};
