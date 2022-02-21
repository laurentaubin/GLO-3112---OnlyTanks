import { Menu } from "@headlessui/react";

interface Props {
  onClick: () => void;
  label: string;
  backgroundColor: "blue" | "red";
}

export const DropDownMenuItem = ({ onClick, label, backgroundColor }: Props) => {
  return (
    <Menu.Item onClick={onClick}>
      {({ active }) => (
        <button
          className={[
            "group flex rounded-md items-center w-full px-2 py-2 text-sm",
            active ? "text-white" : "text-gray-900",
            active && backgroundColor === "blue" ? "bg-blue-primary" : "",
            active && backgroundColor === "red" ? "bg-red-primary" : ""
          ].join(" ")}
        >
          {label}
        </button>
      )}
    </Menu.Item>
  );
};
