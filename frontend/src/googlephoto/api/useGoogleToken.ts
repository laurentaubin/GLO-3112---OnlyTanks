import { getConfigForEnvironment } from "../../config";
import { constants } from "../../constants/constants";

export const useGoogleToken = () => {
  const config = getConfigForEnvironment();
  const serverBaseUrl = config.server.address + (config.server.port ? `:${config.server.port}` : "");

  const getToken = async () => {
    if (tokenExpired()) {
      const refreshToken = sessionStorage.getItem(constants.GOOGLE_REFRESH_TOKEN);
      const token = await getValidTokenFromServer(refreshToken as string);
      sessionStorage.setItem(constants.GOOGLE_ACCESS_TOKEN, token.accessToken);
      sessionStorage.setItem(constants.GOOGLE_EXPIRATION_DATE, newExpirationDate());
      return token.accessToken;
    } else {
      return sessionStorage.getItem(constants.GOOGLE_ACCESS_TOKEN);
    }
  };

  const newExpirationDate = () => {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration.toDateString();
  };

  const tokenExpired = () => {
    const now = Date.now();
    const expirationDate = sessionStorage.getItem(constants.GOOGLE_EXPIRATION_DATE);
    const expDate = new Date(expirationDate as string);
    return now > expDate.getTime();
  };

  const getValidTokenFromServer = async (refreshToken: string) => {
    try {
      const request = await fetch(serverBaseUrl + "/get-valid-token?" + new URLSearchParams({ refreshToken: refreshToken }), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      return await request.json();
    } catch (error) {
      throw new Error("Issue getting new token");
    }
  };

  return { getToken };
};
