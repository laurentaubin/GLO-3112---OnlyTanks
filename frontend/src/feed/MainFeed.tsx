import React from "react";
import { State } from "../main/hooks/useAxios";
import { useHelloWord } from "../main/hooks/useHelloWorld";

export const MainFeed = () => {
  const { helloWorld, state } = useHelloWord();

  return (
    <div className="text-3xl text-green-300">
      {state === State.LOADING && <p>loading...</p>}
      {state === State.ERROR && <p>Whoops, there was an error reaching the server</p>}
      {state === State.SUCCESS && <p>{helloWorld}</p>}
    </div>
  );
};
