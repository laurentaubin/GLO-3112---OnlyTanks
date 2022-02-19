import Suggestion from "../main/domain/Suggestion";

interface Props {
  suggestion: Suggestion;
}

const SuggestionCard = ({ suggestion }: Props) => {
  return (
    <div className="w-full">
      <div
        className="h-32 border-2 border-gray-100 rounded-lg items-center flex relative mb-2"
        style={{ background: `url(${suggestion.backgroundImageUrl})` }}
      >
        <img className="rounded-full w-24 h-24 left-0 border-2 border-black ml-2 z-20" src={suggestion.profileImageUrl} alt="" />
        <div className="left-0 bottom-0 right-0 py-5 bg-black/25 absolute pl-32 xl:pl-14 rounded-b-lg">
          <div className="flex justify-center text-lg text-white font-semibold mr-4 ">{suggestion.username}</div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
