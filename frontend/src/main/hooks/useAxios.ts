import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { getConfigForEnvironment } from "../../config";
import { useCookies } from "react-cookie";
import { constants } from "../../constants/constants";
import * as Sentry from "@sentry/react";

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
      Sentry.captureMessage(JSON.stringify({ url: params.url, method: params.method }));
      const result = await axios.request({
        ...params,
        // TODO Find a way to set attribute name dynamically
        headers:
          cookies[constants.SESSION_TOKEN_COOKIE] && cookies[constants.AUTH_PROVIDER_COOKIE]
            ? {
                ...params.headers,
                "x-onlytanks-token": cookies[constants.SESSION_TOKEN_COOKIE],
                "x-auth-provider": cookies[constants.AUTH_PROVIDER_COOKIE]
              }
            : { ...params.headers }
      });
      setData(result);
      setState(State.SUCCESS);
    } catch (err: any) {
      Sentry.captureException(err);
      setState(State.ERROR);
    }
  };

  return { data, error, setError, state, sendRequest };
};
