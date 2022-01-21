import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { getConfigForEnvironment } from "../config";

const config = getConfigForEnvironment();

axios.defaults.baseURL = config.server.address + (config.server.port ? `:${config.server.port}` : "");

type State = "idle" | "loading" | "success" | "error";

export const useAxios = () => {
  const [data, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [state, setState] = useState<State>("idle");

  const fetchData = async (params: AxiosRequestConfig) => {
    setState("loading");
    try {
      const result = await axios.request(params);
      setResponse(result);
      setState("success");
    } catch (err: any) {
      setError(err);
      setState("error");
    }
  };

  return { data, error, state, fetchData };
};
