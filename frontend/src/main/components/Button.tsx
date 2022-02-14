interface Props {
  text: string;
  onClick: () => void;
  color?: string;
  textColor?: string;
  hoverColor?: string;
  disabled?: boolean;
}

const Button = ({
  text,
  onClick,
  color = "bg-blue-primary",
  hoverColor = "bg-blue-secondary",
  textColor = "text-white",
  disabled = false
}: Props) => {
  return (
    <div className="flex items-center justify-center mt-10">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${disabled ? "bg-gray-light" : color} hover:${
          disabled ? "" : hoverColor
        } ${textColor} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        type="button"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
