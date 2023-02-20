const PetCard = ({ name, imgName, birthYear, particularSigns, animalType = "organismo vivente" }) => {
  return (
    <div className="bg-yellow-400 shadow-lg rounded-xl grid grid-cols-2 md:max-w-[35rem]">

      <img
        src={`${process.env.REACT_APP_BASE_MEDIA_URL}/${ imgName }`}
        alt="animal"
        className="shadow-xl border-none rounded-l-xl"
      />
      <div className="flex flex-col justify-between items-center">
        <div>
          <p className="text-amber-800 font-bold text-3xl tracking-tighter"> { name } </p>
          <p className="font-semibold"> { animalType } </p>
        </div>
        <p className="font-semibold"> Anno di nascita { birthYear } </p>
        <p> { particularSigns } </p>
      </div>
            
    </div>
  );
};

export default PetCard;
