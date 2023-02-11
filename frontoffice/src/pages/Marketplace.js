import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, waitingGetAll } from "../app/productsSlice";
import { MagnifyingGlass } from  'react-loader-spinner'
import ProductCard from "../components/Marketplace/ProductCard"


const Marketplace = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: "min,-max,",
      sort: "",
    },
  });
  const { products, loadingAll } = useSelector((state) => state.marketplace);
  // Flag della scritta "I prodotti del mese"
  // const [ showcase, setShowcase ] = useState(true)

  const onSubmit = (data) => {
    dispatch(waitingGetAll())
  };

  useEffect(() => {
    console.log(products.length)
    // Presumibilmente, stiamo caricando per la prima volta i prodotti da mongo
    if (products.length === 0) {
      dispatch(waitingGetAll())
      dispatch(getAllProducts({}));
    }
    
  }, [dispatch, products.length]);

  return (
    <div className="flex flex-col items-center mt-12">
      <article className="prose">
        <h1>Negozio</h1>
      </article>
      <div className="flex justify-center md:w-[900px] w-full max-w-full">
        <form
          className="bg-white shadow-md rounded pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-3 grid-cols-1 w-screen p-8 items-center space-x-3">
            <div className="mb-4">
              <label
                className="text-lg block text-gray-700 font-bold mb-2"
                htmlFor="main-keyword"
              >
                Cosa cerchi?
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="main-keyword"
                type="text"
                placeholder="Pellet, Palla, Cibo"
                {...register("name", {
                  pattern: {
                    value: /([a-z][A-Z])*/,
                    message: "Parola Illegale",
                  },
                })}
              />
              <ErrorMessage
                as={<p className="text-red-600" />}
                errors={errors}
                name="email"
              />
            </div>

            <div className="mb-4">
              <label
                className="text-lg block text-gray-700 font-bold mb-2"
                htmlFor="price"
              >
                Prezzo
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="price"
                {...register("price")}
              >
                <option defaultValue value="min,-max,">
                  {" "}
                  Tutti i prezzi{" "}
                </option>
                <option value="min,0-max,5"> Fino a EURO 5 </option>
                <option value="min,5-max,10"> 5 a 10 EURO </option>
                <option value="min,10-max,20"> 10 a 20 EURO </option>
                <option value="min,20-max,50"> 20 a 50 EURO </option>
                <option value="min,50-max,-"> 50 EURO e oltre </option>
              </select>
              <ErrorMessage
                as={<p className="text-red-600" />}
                errors={errors}
                name="name"
              />
            </div>
            <div className="mb-4">
              <label
                className="text-lg block text-gray-700 font-bold mb-2"
                htmlFor="sort"
              >
                Ordina i risultati
              </label>
              <input
                selected
                id="sort"
                {...register("sort")}
                type="checkbox"
                value="true"
              />
            </div>
          </div>

          <div className="justify-center flex">
            <input
              value="Crea"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            />
          </div>
        </form>
      </div>
      { loadingAll && (
      <div className="flex justify-center flex-col items-center">
        <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#c0efff'
            color = '#FBBF24'
        />
        <small>{" "} Caricando i prodotti della vetrina... {" "}</small>
      </div>
      ) }
      <div className="grid md:grid-cols-3 grid-cols-1 mb-8 mt-8 md:space-y-0 space-y-6 md:space-x-6">
        { products.map((product, index) => {
            return (
                <ProductCard {...product} key={index} />
            )
        }) }
      </div>
    </div>
  );
};

export default Marketplace;
