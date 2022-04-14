import { useState } from "react";
import axios from "axios";
import { useGoogleToken } from "../../googlephoto/api/useGoogleToken";
import { GooglePhoto } from "../../googlephoto/GooglePhoto";

export const useFetchGoogleImageFile = () => {
  const { getToken } = useGoogleToken();
  const [fetchedGoogleImageFile, setFetchedGoogleImageFile] = useState<File>();

  const fetchImageFile = async (googlePhoto: GooglePhoto) => {
    const token = await getToken();

    await axios
      .request({
        url: "/google-photos/blob",
        method: "GET",
        params: {
          imageUrl: googlePhoto.src
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: "blob"
      })
      .then((res) => {
        const file = new File([res.data], googlePhoto.filename, { type: googlePhoto.type });
        setFetchedGoogleImageFile(file);
      });
  };

  return { fetchedGoogleImageFile, fetchImageFile };
};
