import React, { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");

  const isUsernameValid = () => {
    return !username;
  };

  return (
    <>
      <input
        className="bg-slate-100 rounded px-2 py-2 border-[1px] w-full "
        placeholder="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <button
        className={"text-white rounded py-2 mt-2 w-full " + (isUsernameValid() ? "bg-blue-200" : "bg-blue-400")}
        disabled={isUsernameValid()}
      >
        Log In
      </button>
    </>
  );
};
