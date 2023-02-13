import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state.marketplace);

  const totalItems = cart?.products?.length || 0;

  return (
    <div className="cursor-pointer rounded">
      <div className="flex flex-start items-center w-full">
        <Link
          to="/marketplace/cart"
          type="button"
          role="button"
          slot="icon"
          className="relative"
        >
          <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white">
            {totalItems}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-shopping-cart w-6 h-6 mt-2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
