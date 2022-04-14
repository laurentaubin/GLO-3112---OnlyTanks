import { useEffect } from "react";
import UserAssembler from "../../profile/api/UserAssembler";
import UserPreviewResponse from "../../main/api/user/UserPreviewResponse";
import { useAxios } from "../../main/hooks/useAxios";
import Suggestion from "../../main/domain/Suggestion";
import SuggestionAsssembler from "./SuggestionAsssembler";

export const useSuggestion = () => {
  const { data, sendRequest, state, error } = useAxios();

  useEffect(() => {
    const getRecommendation = async () => {
      await sendRequest({ url: "/users/suggestions", method: "GET", params: { limit: 3 } });
    };
    getRecommendation();
  }, []);

  return {
    suggestions: data?.data.map(SuggestionAsssembler.assembleFromUserPreviewResponse) as Suggestion[],
    state,
    error
  };
};
