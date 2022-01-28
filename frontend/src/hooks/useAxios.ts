import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { getConfigForEnvironment } from "../config";

const config = getConfigForEnvironment();

axios.defaults.baseURL = config.server.address + (config.server.port ? `:${config.server.port}` : "");

export type State = "idle" | "loading" | "success" | "error";

export const useAxios = () => {
  const [data, setData] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [state, setState] = useState<State>("idle");

  const sendRequest = async (params: AxiosRequestConfig) => {
    setState("loading");
    try {
      const result = await axios.request(params);
      setData(result);
      setState("success");
    } catch (err: any) {
      setError(err);
      setState("error");
    }
  };

  return { data, error, state, sendRequest };
};
