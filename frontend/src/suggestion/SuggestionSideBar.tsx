import SuggestionHeader from "./SuggestionHeader";
import SuggestionCard from "./SuggestionCard";
import Suggestion from "../main/domain/Suggestion";
import InfoFooter from "./InfoFooter";

const suggestions: Suggestion[] = [
  {
    backgroundImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCJsBQAXkJcRIoqBdiYXMIrHQT6G0bQ07RmQ&usqp=CAU",
    profileImageUrl: "https://i.redd.it/if1tl43q6qt41.jpg",
    username: "Frank the Tank"
  },
  {
    backgroundImageUrl: "https://img.wattpad.com/cover/194670539-288-k620282.jpg",
    profileImageUrl: "https://only-tanks-user-images.s3.amazonaws.com/da83d097b79041b92b4bdd76232e2cc0",
    username: "UwU Girly"
  }
];

const SuggestionSideBar = () => {
  return (
    <div className="mt-4 pr-4">
      <SuggestionHeader />
      {suggestions.map((suggestion) => (
        <SuggestionCard suggestion={suggestion} key={suggestion.username} />
      ))}
      <InfoFooter />
    </div>
  );
};

export default SuggestionSideBar;
