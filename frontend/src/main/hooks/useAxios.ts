import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { getConfigForEnvironment } from "../../config";
import { useCookies } from "react-cookie";
import { constants } from "../../constants/constants";

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

  const [cookies] = useCookies([constants.AUTH_PROVIDER_COOKIE, constants.SESSION_TOKEN_COOKIE]);

  const sendRequest = async (params: AxiosRequestConfig) => {
    setState(State.LOADING);
    try {
      const result = await axios.request({
        ...params,
        // TODO Find a way to set attribute name dynamically
        headers:
          cookies[constants.SESSION_TOKEN_COOKIE] && cookies[constants.AUTH_PROVIDER_COOKIE]
            ? {
                "x-onlytanks-token": cookies[constants.SESSION_TOKEN_COOKIE],
                "x-auth-provider": cookies[constants.AUTH_PROVIDER_COOKIE]
              }
            : {}
      });
      setData(result);
      setState(State.SUCCESS);
    } catch (err: any) {
      setError(err);
      setState(State.ERROR);
    }
  };

  return { data, error, state, sendRequest };
};
