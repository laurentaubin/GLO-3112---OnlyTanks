interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
}

const Button = ({ text, onClick, disabled = false, className, buttonClassName }: Props) => {
  return (
    <div className={"flex items-center justify-center mt-10 " + className}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={["font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", buttonClassName].join(" ")}
        type="button"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
