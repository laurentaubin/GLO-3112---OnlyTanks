import { useAxios } from "../../main/hooks/useAxios";
import { useEffect, useState } from "react";
import UserAssembler from "./UserAssembler";
import User from "../../main/domain/User";
import UserResponse from "./UserResponse";

export const useUser = (username: string) => {
  const { data, sendRequest, state, error } = useAxios();

  useEffect(() => {
    const getByUsername = async () => {
      await sendRequest({ url: `/user/${username}`, method: "GET" });
    };

    getByUsername();
  }, []);

  return { user: UserAssembler.assembleToUser(data?.data as UserResponse), state, error };
};