import { ReactNode } from "react";

interface Props {
  variant?: "sm" | "xl";
  children: ReactNode;
}

export const MenuItem = ({ variant, children }: Props) => {
  const findMinHeightByVariant = (): string => {
    switch (variant) {
      case "xl":
        return "md:min-h-[50vh]";

      default:
        return "";
    }
  };

  return <div className={"max-w-sm mt-2 py-4 md:border-2 bg-white " + findMinHeightByVariant()}>{children}</div>;
};
