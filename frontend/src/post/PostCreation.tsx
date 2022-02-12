import { useState } from "react";
import { PostImageContent } from "./api/PostImageRequest";
import HashtagInput from "./components/HashtagInput";
import ImageSelector from "./components/ImageSelector";
import InputWithLabel from "../main/components/InputWithLabel";
import Button from "../main/components/Button";
import { useCreatePost } from "./api/useCreatePost";
import { FormLayout } from "../main/components/FormLayout";
import { Form, Field } from "formik";

export default function PostCreation() {
  const { createPost, data, error } = useCreatePost();
  const [imageSource, setImageSource] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [file, setFile] = useState<File>();
  const [caption, setCaption] = useState<string>("");

  const submit = () => {
    const postImageContent: PostImageContent = {
      image: file!,
      caption: caption,
      author: "Testing12345",
      hashtags: hashtags
    };

    createPost(postImageContent);
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
