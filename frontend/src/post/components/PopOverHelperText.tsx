interface Props {
  text: string;
}

export const PopOverHelperText = ({ text }: Props) => {
  return (
    <div className="flex w-full justify-center">
      <div className={"bg-black opacity-85 z-10 absolute py-1 px-2 rounded-md select-none top-5"}>
        <p className="text-white">{text}</p>
      </div>
    </div>
  );
};
