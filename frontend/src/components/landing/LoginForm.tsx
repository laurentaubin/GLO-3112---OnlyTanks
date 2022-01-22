import React, { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");

  const isUsernameValid = () => {
    return !username;
  };

  return (
    <>
      <input
        className="bg-slate-100 rounded px-2 py-1"
        placeholder="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      ></input>
      <button
        className={"text-white rounded py-1 mt-2 " + (isUsernameValid() ? "bg-blue-200" : "bg-blue-400")}
        disabled={isUsernameValid()}
      >
        Log In
      </button>
    </>
  );
};
