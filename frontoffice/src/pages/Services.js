import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { FallingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCities, getLocationsByCity, waitingGetCities, waitingGetLocations } from "../app/locationsSlice";
import { getAllServices, waitingGetAllServices } from "../app/servicesSlice";
import ServiceCard from "../components/Service/ServiceCard";

const defaultValues = {
    city: "all",
    location: "",
}

const Services = () => {
  const dispatch = useDispatch();
  const { cities, locations, loadingCities, loadingLocations } = useSelector((state) => state.locations);
  const { isLogged } = useSelector((state) => state.auth);
  const { services } = useSelector(state => state.bookings)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  

  useLayoutEffect(() => {
    dispatch(waitingGetCities());
    dispatch(getAllCities());
    dispatch(waitingGetAllServices());
    dispatch(getAllServices({}));
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(waitingGetAllServices());
    dispatch(getAllServices({ location: data.location }));
  }
  
  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);
  if (!isLogged) return <></>;
  else
  if (loadingCities)
    return (
      <div className="flex mt-8 justify-center items-center">
        <FallingLines
          color="#FBBF24"
          width="50"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
        <small> Caricamento in corso... </small>
      </div>
    );
  return (
    <div className="flex flex-col items-center mt-12">
    <h1 className="font-bold text-4xl">Servizi</h1>
      <form
        autoComplete="off"
        className="bg-white w-[400px] max-w-full rounded mt-8 pt-6 pb-8 mb-4 flex flex-col justify-center gap-y-4 px-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="text-lg block text-gray-700 font-bold mb-2"
            htmlFor="city"
          >
            Citta'
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="city"
            {...register("city", {
              onChange: (e) => {
                if (watch("city") !== "all") {
                  dispatch(waitingGetLocations());
                  dispatch(getLocationsByCity({ city: watch("city") }));
                } else {
                    setValue("location", "")
                }
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
          <div className="justify-center flex">
          <input
            value="Ricerca"
            className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded hover:cursor-pointer"
            type="submit"
          />
        </div>
      </form>
      <div className="mt-16 grid md:grid-cols-2 grid-cols-1 md:gap-x-4 gap-x-0">
       {services.length > 0 && 
       services.map((service, index) => <ServiceCard key={index} {...service} />)}
      </div>
    </div>
  );
};

export default Services;
