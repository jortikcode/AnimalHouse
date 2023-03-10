import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddCart from "./AddCart";
import Star from "./Star";


const ProductCard = ({ _id, name, price, imgName, rating, qta }) => {
  const { cart } = useSelector(state => state.marketplace)
  const { isLogged } = useSelector(state => state.auth)
  const [ inCart, setInCart ] = useState(false)

  useEffect(() => {
    if (cart.products)
      if (cart.products.find((cartItem) => cartItem.product === _id)) setInCart(true);
      else setInCart(false);
  }, [cart, _id]);

  return (
      <div className="rounded-lg max-w-sm hover:bg-yellow-100 border-4 border-black my-3">
        <Link to={`/marketplace/${_id}`}>
          <img className="mx-auto rounded-t-lg p-8 h-64 w-full object-cover object-center" src={`${process.env.REACT_APP_BASE_MEDIA_URL}/${imgName}`} alt="product" />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/marketplace/${_id}`}>
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{name}</h3>
          </Link>
          <div className="flex items-center mt-2.5 mb-5">
            {[...Array(rating)].map((e, index) => (
              <span
                className=""
                key={index}>
                {" "}
                <Star />{" "}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">€{price.toFixed(2)}</span>
            {isLogged && inCart ? (
              <Link
                className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                to="/marketplace/cart">
                {" "}
                Nel carrello{" "}
              </Link>
            ) : isLogged ? (
              <AddCart
                id={_id}
                qta={qta}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
  );
};

export default ProductCard;
