import { Link } from "react-router-dom";

const Bill = ({ productID, quantity }) => {
  return (
      <div className="border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">
        <div className="grid grid-cols-5 p-5 gap-y-2">
          <div className="col-span-5 md:col-span-4 ml-4">
            <p>
              <Link
                to={`/marketplace/${productID}`}
                className="text-sky-500 font-bold text-xs"
              >
                Link al prodotto
              </Link>
            </p>

            <p className="text-gray-400"> Quantita' comprate: {quantity} </p>
          </div>
        </div>
      </div>
  );
};

export default Bill;
