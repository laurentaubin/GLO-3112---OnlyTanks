import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { getConfigForEnvironment } from "../../config";

const config = getConfigForEnvironment();

axios.defaults.baseURL = config.server.address + (config.server.port ? `:${config.server.port}` : "");

export enum State {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

export const useAxios = () => {
  const [data, setData] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [state, setState] = useState<State>(State.IDLE);

  const sendRequest = async (params: AxiosRequestConfig) => {
    setState(State.LOADING);
    try {
      const result = await axios.request(params);
      setData(result);
      setState(State.SUCCESS);
    } catch (err: any) {
      setError(err);
      setState(State.ERROR);
    }
  };

  return { data, error, state, sendRequest };
};
