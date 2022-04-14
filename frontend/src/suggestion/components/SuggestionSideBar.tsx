import SuggestionHeader from "./SuggestionHeader";
import SuggestionCard from "./SuggestionCard";
import InfoFooter from "../InfoFooter";
import { useSuggestion } from "../api/useSuggestion";

const SuggestionSideBar = () => {
  const { suggestions } = useSuggestion();

  return (
    <div className="mt-4 pr-4">
      <SuggestionHeader />
      {suggestions && suggestions.map((suggestion) => <SuggestionCard suggestion={suggestion} key={suggestion.username} />)}
      <InfoFooter />
    </div>
  );
};

export default SuggestionSideBar;
