const PetCard = ({ name, imgName, birthYear, particularSigns }) => {
  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-yellow-400 w-full mb-6 shadow-lg rounded-xl">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src={imgName}
                alt="animal"
                className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="text-2xl text-black font-bold leading-normal mb-1">
            {name}{" "}
          </h3>
          <div className="text-xs mb-2 text-black font-bold uppercase">
            Data di nascita: {birthYear}
          </div>
        </div>
        <div className="mt-6 py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <p className="leading-relaxed font-semibold text-black mb-4">
                {" "}
                {particularSigns}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
