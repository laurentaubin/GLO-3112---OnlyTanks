import { FiSearch } from "react-icons/fi";

export const SearchBar = () => {
  return (
    <div className={["mb-2 flex flex-row rounded-xl border bg-white px-2"].join(" ")}>
      <FiSearch className="my-auto" size={24} />
      <input placeholder="Search" className={["w-full p-2 outline-none"].join(" ")} />
    </div>
  );
};
