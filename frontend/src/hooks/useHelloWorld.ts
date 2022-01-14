import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export const useHelloWord = () => {
  const [helloWorld, setHelloWord] = useState("");
  const { data, fetchData, state } = useAxios();

  useEffect(() => {
    fetchData({ url: "/", method: "GET" });
  }, []);

  useEffect(() => {
    setHelloWord(data?.data);
  }, [data]);

  return { helloWorld, state };
};
