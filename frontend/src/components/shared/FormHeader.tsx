import React from "react";

interface Props {
  text?: string;
}

export const FormHeader = ({ text }: Props) => {
  return (
    <div className="pb-6 mb-4 relative">
      <img src="/images/OnlyTanks-Logo-Full.svg" alt="OnlyTanks Logo" />
      {text && <h1 className="font-semibold mt-4 text-gray-500">{text}</h1>}
    </div>
  );
};
