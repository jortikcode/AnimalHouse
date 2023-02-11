import { Link } from "react-router-dom";

const ProductCard = ({ _id, name, price, qta, imgPath }) => {
  const addToCart = (id) => {
    // Aggiungilo al carrello con id
  };

  return (
    <div
      className={`bg-white border max-w-fit md:w-[375px] w-[320px]
                border-gray-200 rounded-lg shadow ${qta === 0 ? "bg-gray-300" : ""}`}
    >
      <Link to={`/marketplace/${_id}`}>
        <img
          className="p-8 rounded-t-lg"
          src={imgPath}
          alt="Immagine del prodotto"
        />
      </Link>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {`${price}€`}
          </span>

          { qta > 0 && (
          <button
            type="button"
            className="focus:ring-blue-300 appearance-none"
            onClick={addToCart(_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="md:w-10 md:h-10 w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>)
          }
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
