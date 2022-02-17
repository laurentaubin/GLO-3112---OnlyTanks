import { useEffect, useState } from "react";
import Button from "../main/components/Button";
import { FormLayout } from "../main/components/FormLayout";
import InputWithLabel from "../main/components/InputWithLabel";
import { useAuth } from "../main/hooks/useAuth";
import { PostImageContent } from "./api/PostImageRequest";
import { useCreatePost } from "./api/useCreatePost";
import HashtagInput from "./components/HashtagInput";
import ImageSelector from "./components/ImageSelector";
import { State } from "../main/hooks/useAxios";
import { useRouter } from "next/router";

export default function PostCreation() {
  const [imageSource, setImageSource] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
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
      hashtags: hashtags
    };

    await createPost(postImageContent);
  };

  const onImageSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setImageSource(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center md:items-center">
      <FormLayout>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <ImageSelector imageSource={imageSource} onImageSelected={onImageSelected} />
            <InputWithLabel label="Caption" onTextChange={setCaption} />
          </div>
          <HashtagInput hashtags={hashtags} setHashtags={setHashtags} />
          <Button text="Post" onClick={submit} />
        </form>
      </FormLayout>
    </div>
  );
}
