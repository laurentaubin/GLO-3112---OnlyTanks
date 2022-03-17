import ReactTagInput from "@pathofdev/react-tag-input";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  search: (inputs: string[]) => void;
  placeholder: string;
}

const MultipleInputsSearchBar = ({ search, placeholder }: Props) => {
  const [values, setValues] = useState<string[]>([]);

  const onTextChange = (values: string[]) => {
    setValues(values);
    search(values);
  };

  return (
    <div className={["mb-2 flex flex-row rounded-xl border bg-white px-2"].join(" ")}>
      <FiSearch className="my-auto" size={24} />
      <ReactTagInput placeholder={placeholder} tags={values} onChange={(newTags) => onTextChange(newTags)} />
    </div>
  );
};

export default MultipleInputsSearchBar;
