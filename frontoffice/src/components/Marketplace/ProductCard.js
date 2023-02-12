import { Link } from "react-router-dom";
import AddCart from "./AddCart";
import Star from "./Star";

const ProductCard = ({ _id, name, price, imgPath, rating }) => {
  return (
    <div className="max-w-full">
      <div className="bg-white shadow-md rounded-lg max-w-sm hover:bg-yellow-100">
        <Link to={`/marketplace/${_id}`}>
          <img className="rounded-t-lg p-8" src={imgPath} alt="product image" />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/marketplace/${_id}`}>
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
              {name}
            </h3>
          </Link>
          <div className="flex items-center mt-2.5 mb-5">
            {[...Array(rating)].map((e, index) => (
              <span className="" key={index}>
                {" "}
                <Star />{" "}
              </span>
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {rating}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {price}€
            </span>
            <AddCart id={_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
