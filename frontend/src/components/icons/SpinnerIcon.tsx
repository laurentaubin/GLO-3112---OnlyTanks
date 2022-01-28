import { ImSpinner8 } from "react-icons/im";

interface Props {
  size: number;
}

export const SpinnerIcon = ({ size }: Props) => {
  return (
    <div className="flex animate-spin w-min">
      <ImSpinner8 size={size} />
    </div>
  );
};
