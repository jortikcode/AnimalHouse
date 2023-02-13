import { useDispatch } from "react-redux";
import { addToCart } from "../../app/productsSlice";

const AddCart = ({ id, qta }) => {
  const dispatch = useDispatch();
  const add = (id) => {
    dispatch(addToCart({ id }));
  };

  return (
    <>
      {qta > 0 && (
        <button
          type="button"
          onClick={(e) => add(id)}
          className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Aggiungi al carrello
        </button>
      )}
    </>
  );
};

export default AddCart;
