import { useGoogleToken } from "./useGoogleToken";
import { useAxios } from "../../main/hooks/useAxios";
import GooglePhotoAssembler from "./GooglePhotoAssembler";

export const useGooglePhotos = () => {
  const { data, sendRequest } = useAxios();
  const { getToken } = useGoogleToken();

  const getGooglePhotos = async () => {
    const token = await getToken();
    await sendRequest({
      url: "/google-photos",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };
  return { googlePhotos: data?.data.mediaItems.map(GooglePhotoAssembler.assemble), getGooglePhotos };
};
