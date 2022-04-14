import Link from "next/link";
import Suggestion from "../../main/domain/Suggestion";
import { GiTank } from "react-icons/gi";

interface Props {
  suggestion: Suggestion;
}

const SuggestionCard = ({ suggestion }: Props) => {
  return (
    <div className="w-full cursor-pointer">
      <Link href={`/${suggestion.username}`} passHref>
        <div
          className="h-32 border-2 border-gray-100 rounded-lg items-center flex relative mb-2"
          style={{ background: `url(${suggestion.backgroundImageUrl})` }}
        >
          <img className="rounded-full w-24 h-24 left-0 border-2 border-black ml-2 z-20" src={suggestion.profileImageUrl} alt="" />
          <div className="left-0 bottom-0 right-0 py-5 bg-black/25 absolute pl-32 xl:pl-14 rounded-b-lg">
            <div className="flex justify-center text-lg text-white font-semibold mr-4 ">{suggestion.username}</div>
            <div className="flex justify-center text-sm text-white mr-4">
              {suggestion.totalNumberOfLikes}
              <div className="flex items-center ml-1">
                <GiTank />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SuggestionCard;
