import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../main/components/Button";
import InputWithLabel from "../main/components/InputWithLabel";
import UserTag from "../main/domain/UserTag";
import { useAuth } from "../main/hooks/useAuth";
import { State } from "../main/hooks/useAxios";
import { PostImageContent } from "./api/PostImageRequest";
import { useCreatePost } from "./api/useCreatePost";
import HashtagInput from "./components/HashtagInput";
import ImageSelector from "./components/ImageSelector";

export default function PostCreation() {
  const [imageSource, setImageSource] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const [file, setFile] = useState<File>();
  const [caption, setCaption] = useState<string>("");

  const { me } = useAuth();

  const { state, createPost } = useCreatePost();

  const router = useRouter();

  useEffect(() => {
    if (state === State.SUCCESS) {
      router.push("/");
    }
  }, [state]);

  const submit = async () => {
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

  return (
    <div className="flex justify-center h-full items-center md:items-start md:pt-12 overflow-x-auto md:overflow-x-visible">
      <form className="flex flex-col justify-center bg-white shadow-md rounded md:px-8 md:pt-6 pb-8 mb-4 w-full min-h-[50%]">
        <ImageSelector
          imageSource={imageSource}
          userTags={userTags}
          onTagDelete={onTagDeleted}
          onImageSelected={onImageSelected}
          onUserTagged={onUserTagged}
        />
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
