import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export const useHelloWord = () => {
  const [helloWorld, setHelloWord] = useState("");
  const { data, sendRequest, state } = useAxios();

  useEffect(() => {
    sendRequest({ url: "/hello-world", method: "GET" });
  }, []);

  useEffect(() => {
    setHelloWord(data?.data);
  }, [data]);

  return { helloWorld, state };
};
