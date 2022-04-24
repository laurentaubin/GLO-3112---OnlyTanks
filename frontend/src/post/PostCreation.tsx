import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../main/components/Button";
import InputWithLabel from "../main/components/InputWithLabel";
import UserTag from "../main/domain/UserTag";
import { useAuth } from "../main/hooks/useAuth";
import { PostImageContent } from "./api/PostImageRequest";
import { useCreatePost } from "./api/useCreatePost";
import HashtagInput from "./components/HashtagInput";
import ImageSelector from "./components/ImageSelector";
import { useGooglePhotos } from "../googlephoto/api/useGooglePhotos";
import { State } from "../main/hooks/useAxios";
import GooglePhotosModal from "../googlephoto/components/GooglePhotosModal";
import { GooglePhoto } from "../googlephoto/GooglePhoto";
import { useFetchGoogleImageFile } from "./api/useFetchGoogleImageFile";
import { useCreateGoogleAuthLink } from "../googlephoto/api/useCreateGoogleAuthLink";
import { GooglePhotosButton } from "../googlephoto/components/GooglePhotosButton";
import { constants } from "../constants/constants";
import analyticsService, { AnalyticEvent } from "../services/analytics";

export default function PostCreation() {
  const [imageSource, setImageSource] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const [file, setFile] = useState<File>();
  const [caption, setCaption] = useState<string>("");
  const [isConnectedToGooglePhoto, setIsConnectedToGooglePhoto] = useState<boolean>(!!sessionStorage.getItem("accessToken"));
  const { googlePhotos, getGooglePhotos } = useGooglePhotos();
  const [openGooglePhotosModal, setOpenGooglePhotosModal] = useState(false);
  const { fetchedGoogleImageFile, fetchImageFile } = useFetchGoogleImageFile();
  const { authLink, createGoogleAuthLink } = useCreateGoogleAuthLink();

  const { me } = useAuth();

  const { state, createPost } = useCreatePost();

  const router = useRouter();

  useEffect(() => {
    if (state === State.SUCCESS) {
      router.push("/");
    }
  }, [state]);

  useEffect(() => {
    handleTokenFromQueryParams();
  }, []);

  useEffect(() => {
    if (authLink) {
      window.location.href = authLink;
    }
  }, [authLink]);

  useEffect(() => {
    if (fetchedGoogleImageFile) {
      setFile(fetchedGoogleImageFile);
    }
  }, [fetchedGoogleImageFile]);

  const handleTokenFromQueryParams = async () => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get(constants.GOOGLE_ACCESS_TOKEN);
    const refreshToken = query.get(constants.GOOGLE_REFRESH_TOKEN);
    const expirationDate = newExpirationDate();
    if (accessToken && refreshToken) {
      storeTokenData(accessToken, refreshToken, expirationDate);
      setIsConnectedToGooglePhoto(true);
      await getGooglePhotos().then(() => setOpenGooglePhotosModal(true));
    }
  };

  const newExpirationDate = () => {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
  };

  const storeTokenData = async (token: any, refreshToken: any, expirationDate: any) => {
    sessionStorage.setItem(constants.GOOGLE_ACCESS_TOKEN, token);
    sessionStorage.setItem(constants.GOOGLE_REFRESH_TOKEN, refreshToken);
    sessionStorage.setItem(constants.GOOGLE_EXPIRATION_DATE, expirationDate);
  };

  const submit = async () => {
    analyticsService.logEvent(AnalyticEvent.CREATE_POST);
    const postImageContent: PostImageContent = {
      image: file!,
      caption: caption,
      author: me!.username,
      hashtags: hashtags,
      userTags: userTags
    };
    await createPost(postImageContent);
  };

  const onImageSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setImageSource(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };

  const onCancelClick = () => {
    setImageSource("");
    setUserTags([]);
    setFile(undefined);
  };

  const onUserTagged = (newTag: UserTag) => {
    setUserTags((current) => [...current, newTag]);
  };

  const onTagDeleted = (username: string) => {
    setUserTags((current) => current.filter((tag) => tag.username !== username));
  };

  const handleGetGooglePhotosClick = async () => {
    await getGooglePhotos().then(() => setOpenGooglePhotosModal(true));
  };

  const handleGoogleModalClose = () => {
    setOpenGooglePhotosModal(false);
  };

  const handleGoogleImageSelected = async (googlePhoto: GooglePhoto) => {
    analyticsService.logEvent(AnalyticEvent.SELECT_IMAGE_FROM_GOOGLE_IMAGE);
    await fetchImageFile(googlePhoto);
    setImageSource(googlePhoto.src);
    setOpenGooglePhotosModal(false);
  };

  return (
    <div className="flex justify-center h-full items-center md:items-start md:pt-12 overflow-x-auto md:overflow-x-visible">
      {openGooglePhotosModal && (
        <GooglePhotosModal
          isOpen={openGooglePhotosModal}
          photos={googlePhotos}
          handleCancel={handleGoogleModalClose}
          onImageSelected={handleGoogleImageSelected}
        />
      )}
      <form className="flex flex-col justify-center bg-white shadow-md rounded md:px-8 md:pt-6 pb-8 mb-4 w-full min-h-[50%]">
        <ImageSelector
          imageSource={imageSource}
          userTags={userTags}
          onTagDelete={onTagDeleted}
          onImageSelected={onImageSelected}
          onUserTagged={onUserTagged}
        />
        {!file && (
          <GooglePhotosButton
            isConnectedToGooglePhotos={isConnectedToGooglePhoto}
            handleGetGooglePhotosClick={handleGetGooglePhotosClick}
            createGoogleAuthLink={createGoogleAuthLink}
          />
        )}
        {!!file && (
          <>
            <InputWithLabel value={caption} label="Caption" onTextChange={setCaption} />
            <HashtagInput hashtags={hashtags} setHashtags={setHashtags} />
          </>
        )}
        {!!file && (
          <div className="flex flex-row">
            <Button text="Cancel" buttonClassName="bg-white text-gray-400 hover:bg-gray-pale" onClick={onCancelClick} />
            <Button className="ml-auto" text="Post" buttonClassName="bg-blue-primary text-white hover:bg-blue-500" onClick={submit} />
          </div>
        )}
      </form>
    </div>
  );
}
