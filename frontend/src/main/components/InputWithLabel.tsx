interface Props {
  label: string;
  onTextChange: (text: string) => void;
}

const InputWithLabel = ({ label, onTextChange }: Props) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-10">{label}</label>
      <input
        onChange={(e) => onTextChange(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Caption"
      />
    </div>
  );
};

export default InputWithLabel;
