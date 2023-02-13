import { useDispatch } from "react-redux";
import { updateCart } from "../../app/productsSlice";

const CartItem = ({ id, name, price, qta, availables }) => {
  const dispatch = useDispatch();
  const addCartItem = (id) => {
    if (qta + 1  <= availables)
        dispatch(updateCart({ id, quantity: 1 }));
  };
  const removeCartItem = (id) => {
    dispatch(updateCart({ id, quantity: -1 }))
  }
  return (
    <>
      <td className="p-2 font-medium text-gray-800">{name}</td>
      <td className="p-2 text-left">{qta}</td>
      <td className="p-2 text-left font-medium text-green-500">EURO {price}</td>
      <td className="p-2 flex justify-center space-x-3">
        <button
          type="button"
          className="appearance-none"
          onClick={(e) => removeCartItem(id)}
        >
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
        { (qta + 1 <= availables) &&
        <button
          type="button"
          className="appearance-none"
          onClick={(e) => addCartItem(id)}
        >
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
        }
      </td>
    </>
  );
};

export default CartItem;
