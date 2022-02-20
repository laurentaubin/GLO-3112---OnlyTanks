import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

interface Props {
  hashtags: string[];
  setHashtags: (newTags: any) => void;
}

const HashtagInput = ({ hashtags, setHashtags }: Props) => {
  return (
    <div className="my-2">
      <label className="block text-gray-700 text-sm font-bold mb-2"> Hashtags </label>
      <ReactTagInput placeholder="Press enter to confirm Hashtag" tags={hashtags} onChange={(newTags) => setHashtags(newTags)} />
    </div>
  );
};

export default HashtagInput;
