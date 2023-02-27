const ErrorModal = ({ msg, clearErrorFunction }) => {
  return (
    <div
      className={`fixed ${
        msg ? "" : "hidden"
      } flex justify-center flex-col items-center inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full`}
      id="my-modal"
    >
      <div className="bg-white p-6 rounded-lg border-4 border-black w-64 flex items-center flex-col">
        <p className="font-bold text-red-600">{msg} </p>
        <button
          className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded mt-6"
          onClick={(e) => {
            clearErrorFunction()
            }}
        >
          {" "}
          Chiudi{" "}
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
