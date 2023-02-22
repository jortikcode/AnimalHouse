import { useEffect, useLayoutEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  createBooking,
  getServiceByID,
  waitingGetService,
  getAllBookings,
  waitingGetAllBookings,
} from "../../app/servicesSlice";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage } from "@hookform/error-message";
import { useParams, useNavigate } from "react-router-dom";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getDay from "date-fns/getDay";
import { createBill } from "../../app/productsSlice";
import paymentMethods from "../../pages/data/paymentMethods.json";

const defaultValues = {
  date: "",
  time: "",
};

const ServiceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state.auth);
  const { loadingOneService, service, loadingBookings, bookings } = useSelector(
    (state) => state.bookings
  );
  const [excludedTimes, setExcludedTimes] = useState([]);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
    register,
  } = useForm({
    defaultValues,
  });

  useLayoutEffect(() => {
    dispatch(waitingGetService());
    dispatch(getServiceByID({ id }));
    dispatch(waitingGetAllBookings());
    dispatch(
      getAllBookings({ serviceID: id, startDate: new Date(Date.now()) })
    );
  }, [dispatch, id]);

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [navigate, isLogged]);

  const onSubmit = (data) => {
    const bookingDate = new Date(
      data.date.getFullYear(),
      data.date.getMonth(),
      data.date.getDate(),
      data.time.getHours(),
      data.time.getMinutes(),
      0
    );
    dispatch(waitingGetAllBookings());
    dispatch(
      getAllBookings({ serviceID: id, startDate: new Date(Date.now()) })
    );
    // Crea la prenotazione
    dispatch(
      createBooking({
        date: bookingDate,
        service: id,
      })
    );
    // Crea la fattura
    dispatch(
      createBill({
        type: "service",
        service: id,
        total: service.price,
        paymentMethod: data.paymentMethod,
      })
    );
    reset(defaultValues);
  };

  if (
    loadingOneService ||
    JSON.stringify({}) === JSON.stringify(service) ||
    loadingBookings
  )
    return (
      <div className="flex mt-9 justify-center flex-col items-center">
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
        <small>
          {" "}
          Aspettando info sul servizio e sulle disponibilita' dalle nostre
          sedi...{" "}
        </small>
      </div>
    );
  else {
    // Inizio orario lavorativo
    const START_TIME = 9;
    // Fine orario lavorativo
    const END_TIME = 17;
    // Funzione che data una data, ritorna true sse la data non e' un weekend
    const isWeekday = (date) => {
      const day = getDay(date);
      return day !== 0 && day !== 6;
    };
    // Funzione che filtra le ore in modo tale da ritornare solo le ore restanti
    const filterPassedTime = (time) => {
      const currentDate = new Date();
      const selectedDate = new Date(
        new Date(watch("date")).setHours(time.getHours(), 0, 0)
      );
      return currentDate.getTime() < selectedDate.getTime();
    };
    const getExcludedTimes = (selectedDate) => {
      let arrSpecificDates = [];
      const toExcludeTime = bookings.map((booking) => booking.date);
      for (const isoString of toExcludeTime) {
        const date = new Date(isoString);
        if (
          date.getFullYear() === selectedDate.getFullYear() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getDay() === selectedDate.getDay()
        )
          arrSpecificDates.push(date);
      }
      let arrExcludedTimes = [];
      for (const date of arrSpecificDates) {
        // Se l'ora selezionata non e' disponibile, viene azzerata
        if (watch("time"))
          if (
            watch("time").getHours() === date.getHours() &&
            watch("time").getMinutes() === date.getMinutes()
          )
            setValue("time", "");
        arrExcludedTimes.push(
          setHours(setMinutes(date, date.getMinutes()), date.getHours())
        );
      }
      setExcludedTimes(arrExcludedTimes);
    };
    return (
      <section className="text-black overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap text-center">
            <img
              alt="service"
              className="lg:w-1/2 w-full object-cover object-center rounded-xl"
              src={`${process.env.REACT_APP_BASE_MEDIA_URL}/${service.imgName}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <p className="text-md title-font text-gray-800">
                {service.location.address}, {service.location.city}
              </p>
              <p className="text-gray-900 text-3xl title-font font-medium mb-1">
                {service.serviceName}
              </p>
              <p className="leading-relaxed">{service.description}</p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white w-[400px] max-w-full rounded mt-8 pt-6 pb-8 mb-4 flex flex-col justify-center mx-auto"
              >
                <div className="mb-4">
                  <label
                    className="text-lg block text-gray-700 font-bold mb-2"
                    htmlFor="date"
                  >
                    Seleziona la data da prenotare
                  </label>
                  <Controller
                    name="date"
                    control={control}
                    rules={{
                      required: "Inserire una data",
                    }}
                    render={({ field }) => (
                      <DatePicker
                        filterDate={isWeekday}
                        minDate={new Date()}
                        placeholderText="Seleziona una data"
                        onSelect={getExcludedTimes}
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        id="date"
                        isClearable
                        dateFormat="MMMM d, yyyy"
                      />
                    )}
                  />
                  <ErrorMessage
                    as={<p className="text-red-600" />}
                    errors={errors}
                    name="date"
                  />
                </div>
                {watch("date") && (
                  <div className="mb-4">
                    <label
                      className="text-lg block text-gray-700 font-bold mb-2"
                      htmlFor="time"
                    >
                      Per che ora vuoi prenotare?
                    </label>
                    <Controller
                      name="time"
                      control={control}
                      rules={{
                        required: "Inserire un orario",
                      }}
                      render={({ field }) => (
                        <DatePicker
                          showTimeSelect
                          showTimeSelectOnly
                          onSelect={getExcludedTimes}
                          excludeTimes={excludedTimes}
                          timeIntervals={60}
                          minTime={setHours(
                            setMinutes(new Date(), 0),
                            START_TIME
                          )}
                          maxTime={setHours(
                            setMinutes(new Date(), 0),
                            END_TIME
                          )}
                          placeholderText="Seleziona un orario"
                          onChange={(date) => field.onChange(date)}
                          selected={field.value}
                          filterTime={filterPassedTime}
                          id="time"
                          dateFormat="h:mm aa"
                          timeFormat="HH:mm"
                          isClearable
                        />
                      )}
                    />
                    <ErrorMessage
                      as={<p className="text-red-600" />}
                      errors={errors}
                      name="time"
                    />
                  </div>
                )}
                <div className="flex flex-col items-center justify-between">
                  <label
                    className="text-lg block text-gray-700 font-bold mb-2"
                    htmlFor="paymentMethod"
                  >
                    Seleziona un metodo di pagamento
                  </label>
                  <select
                    id="paymentMethod"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("paymentMethod", {
                      required: "Devi scegliere un metodo di pagamento",
                    })}
                  >
                    {paymentMethods.map((method, index) => (
                      <option value={method} key={index}>
                        {" "}
                        {method}{" "}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                      as={<p className="text-red-600" />}
                      errors={errors}
                      name="paymentMethod"
                    />
                </div>

                <div className="flex justify-between items-center">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    €{service.price}
                  </span>
                  <input
                    type="submit"
                    value="Prenota"
                    className="flex text-black font-bold bg-yellow-500 py-2 px-6 focus:outline-none rounded hover:cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default ServiceDetails;
