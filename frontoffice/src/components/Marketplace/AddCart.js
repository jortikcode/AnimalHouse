const AddCart = ({ id }) => {
  const addToCart = (id) => {
    // Aggiungilo al carrello con id
  };
  return (
    <button
      type="button"
      onClick={(e) => addToCart(id)}
      className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Aggiungi al carrello
    </button>
  );
};

export default AddCart;
