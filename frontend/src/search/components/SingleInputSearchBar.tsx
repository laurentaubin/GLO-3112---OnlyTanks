import { KeyboardEvent } from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  search: (input: string) => void;
  placeholder: string;
}

export const SingleInputSearchBar = ({ search, placeholder }: Props) => {
  const [value, setValue] = useState<string>("");

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = useDebouncedCallback(() => {
    search(value);
  }, 1000);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, value]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (value && event.key === "Enter") {
      if (handleSearch.isPending()) {
        handleSearch.cancel();
      }
      search(value);
    }
  };

  return (
    <div className={["mb-2 flex flex-row rounded-xl border bg-white px-2"].join(" ")}>
      <FiSearch className="my-auto" size={24} />
      <input
        autoFocus
        value={value}
        placeholder={placeholder}
        onChange={onTextChange}
        onKeyDown={onKeyDown}
        className={["w-full p-2 outline-none"].join(" ")}
      />
    </div>
  );
};
