import { Link } from "react-router-dom";

const Bill = ({ name, price, imgName, productID, purchasedQuantity }) => {
  return (
    <div className="flex flex-col max-w-[20rem] p-10 bg-yellow-500 border-4 border-black rounded-xl gap-y-4">
      <div className="flex flex-col gap-y-2">
        <p className="text-2xl uppercase text-gray-900 font-bold truncate">
          {" "}
          {name}{" "}
        </p>
        <p className=" text-black">
          Per dettagli clicca{" "}
          <Link
            className="text-blue-800 underline"
            to={`/marketplace/${productID}`}
          >
            qui
          </Link>
        </p>
      </div>
      <div className="prod-img">
        <img
          alt="product"
          src={`${process.env.REACT_APP_BASE_MEDIA_URL}/${imgName}`}
          className="w-full object-cover object-center overflow-hidden"
        />
      </div>
      <div className="prod-info grid gap-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
          <p className="font-bold text-xl">€ {price}</p>
          <p className="font-bold text-xl">x{purchasedQuantity}</p>
        </div>
      </div>
    </div>
  );
};

export default Bill;
