import UserTag from "../../domain/UserTag";
import { PopOverUserTag } from "./PopOverUserTag";

interface Props {
  open?: boolean;
  userTags: UserTag[];
  onTagDelete?: (username: string) => void;
}

export const PopOverUserTagList = ({ open, userTags, onTagDelete }: Props) => {
  return <>{open && userTags.map((tag, index) => <PopOverUserTag tag={tag} key={index} onDelete={onTagDelete} />)}</>;
};
