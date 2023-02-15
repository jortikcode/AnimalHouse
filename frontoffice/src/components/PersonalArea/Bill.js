import { Link } from "react-router-dom";

const Bill = ({ productID, quantity }) => {
  return (
      <div className="rounded-t-2xl">
        <div className="grid grid-cols-5 p-5 gap-y-2">
          <div className="col-span-5 md:col-span-4 ml-4">
            <p>
              <Link
                to={`/marketplace/${productID}`}
                className="text-sky-800 tracking-tighter font-bold text-xl"
              >
                Link al prodotto
              </Link>
            </p>

            <p className="text-black"> Quantita' comprate: {quantity} </p>
          </div>
        </div>
      </div>
  );
};

export default Bill;
