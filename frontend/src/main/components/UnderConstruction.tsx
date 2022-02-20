const GreenLetter = ({ letter }: { letter: string }) => {
  return <span className="text-green-500">{letter}</span>;
};

const RedLetter = ({ letter }: { letter: string }) => {
  return <span className="text-red-600">{letter}</span>;
};

export const UnderConstruction = () => {
  const christmasText = "Christmas 2002!".split("");

  return (
    <div className="flex flex-col justify-center text-center pt-24">
      <h1 className="text-5xl font-bold mb-24">Under Construction</h1>
      <img src="https://m.media-amazon.com/images/I/51MlenT-i+L._AC_SX355_.jpg" alt="Logo" width={275} className="mx-auto" />
      <img src="https://sceendy.com/dm/assets/images/under-construction.gif" alt="Guy" width={200} className="mx-auto my-12" />
      <p className="font-semibold text-blue-800 underline text-5xl mt-12">
        Coming {christmasText.map((letter, index) => (index % 2 === 0 ? <GreenLetter letter={letter} /> : <RedLetter letter={letter} />))}
      </p>
    </div>
  );
};
