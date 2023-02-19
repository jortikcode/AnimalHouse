import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  firstLoad,
  getAllCategories,
  getAllProducts,
  getCart,
  waitingGetAll,
} from "../app/productsSlice";
import {
  getAllCities,
  getLocationsByCity,
  waitingGetCities,
  waitingGetLocations,
} from "../app/locationsSlice";
import { FallingLines, MagnifyingGlass } from "react-loader-spinner";
import ProductCard from "../components/Marketplace/ProductCard";
import priceRanges from "./data/priceRanges.json";

const defaultValues = {
  price: "price>=0",
  sort: "",
  category: "all",
  featured: "true",
  location: "",
  city: "all",
};

const Marketplace = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue
  } = useForm({
    defaultValues,
  });
  const { products, loadingAll, categories, loadingLocations, pageLoaded } =
    useSelector((state) => state.marketplace);
  const { locations, cities, loadingCities, loadingCategories } = useSelector(
    (state) => state.locations
  );
  // Flag della scritta "I prodotti del mese"
  // const [ showcase, setShowcase ] = useState(true)

  const onSubmit = (data) => {
    dispatch(waitingGetAll());
    dispatch(getAllProducts({ ...data, numericFilters: data["price"] }));
  };

  useEffect(() => {
    // Presumibilmente, stiamo caricando per la prima volta i prodotti da mongo
    if (!pageLoaded) {
      dispatch(firstLoad());
      dispatch(waitingGetAll());
      dispatch(getAllCategories({}));
      dispatch(waitingGetCities());
      dispatch(getAllCities());
      dispatch(getAllProducts(getValues()));
      dispatch(getCart({}));
    }
  }, [dispatch, getValues, pageLoaded]);

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="font-bold text-4xl">Negozio</h1>
      <form
        autoComplete="off"
        className="bg-white w-[700px] max-w-sm rounded mt-8 pt-6 pb-8 mb-4 flex flex-col justify-center shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 w-full px-8 pt-8 items-center">
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
                  value: /^([a-zA-Z]*)$/,
                  message: "Parola Illegale",
                },
              })}
            />
            <ErrorMessage
              as={<p className="text-red-600" />}
              errors={errors}
              name="name"
            />
          </div>
          
          <div className="mb-4">
            <label
              className="text-lg block text-gray-700 font-bold mb-2"
              htmlFor="category"
            >
              Categoria
            </label>

            {loadingCategories && (
              <FallingLines
                color="#FBBF24"
                width="50"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            )}

            {!loadingCategories && (
              <>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="category"
                  {...register("category")}
                >
                  <option value="all"> Tutte le categorie </option>
                  {categories.map((category, index) => (
                    <option value={category} key={index}>
                      {" "}
                      {category}{" "}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <div className="mb-4">
            <label
              className="text-lg block text-gray-700 font-bold mb-2"
              htmlFor="city"
            >
              Citta'
            </label>

            {loadingCities && (
              <FallingLines
                color="#FBBF24"
                width="50"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            )}

            {!loadingCities && (
              <>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="city"
                  {...register("city", {
                    onChange: (e) => {
                      if (watch("city") !== "all") {
                        dispatch(waitingGetLocations());
                        dispatch(getLocationsByCity({ city: watch("city") }));
                      } else
                        setValue("location", "")

                    },
                  })}
                >
                  <option value="all"> Tutte le citta' </option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {" "}
                      {city}{" "}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <div className={`mb-4 ${watch("city") === "all" ? "hidden" : ""}`}>
            <label
              className="text-lg block text-gray-700 font-bold mb-2"
              htmlFor="location"
            >
              Sede
            </label>

            {loadingLocations && (
              <FallingLines
                color="#FBBF24"
                width="50"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            )}

            {!loadingLocations && (
              <>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="location"
                  {...register("location", {
                    required: {
                      value: watch("city") === "all" ? false : true,
                      message: "Selezionare una sede",
                    },
                  })}
                >
                  <option disabled value="">
                    {" "}
                    Selezionare una sede{" "}
                  </option>
                  {locations.map((location, index) => (
                    <option value={location["_id"]} key={index}>
                      {" "}
                      {location.address}{" "}
                    </option>
                  ))}
                </select>
                <ErrorMessage
                  as={<p className="text-red-600" />}
                  errors={errors}
                  name="location"
                />
              </>
            )}
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
              <option value="price>=0"> Tutti i prezzi </option>
              {priceRanges.map((e, index) => (
                <option
                  key={index}
                  value={`price>=${e.min}${e.max ? `,price<${e.max}` : ""}`}
                >
                  {e.max ? `da ${e.min} a ${e.max} ` : `OLTRE ${e.min}`} EURO
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="text-lg block text-gray-700 font-bold mb-2"
              htmlFor="featured"
            >
              Consigliati
            </label>
            <input
              id="featured"
              {...register("featured")}
              type="checkbox"
              value="true"
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
              id="sort"
              {...register("sort")}
              type="checkbox"
              value="true"
            />
          </div>
        </div>

        <div className="justify-center flex">
          <input
            value="Cerca"
            className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
            type="submit"
          />
        </div>
      </form>
      <h2 className="text-center tracking-tighter text-2xl">
        {" "}
        Categoria: {watch("category") === "all" ? "Tutte le categorie" : watch("category")}
      </h2>
      {loadingAll && (
        <div className="flex justify-center flex-col items-center">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#FBBF24"
          />
          <small> Caricando i prodotti della vetrina... </small>
        </div>
      )}
      <div className="grid md:grid-cols-3 grid-cols-1 mb-8 mt-8 md:gap-y-0 gap-y-6 md:gap-x-6 px-2">
        {products.map((product, index) => {
          return <ProductCard {...product} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Marketplace;
