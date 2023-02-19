import { useEffect, useLayoutEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  createBooking,
  getServiceByID,
  waitingGetService,
  getAllBookings
} from "../../app/servicesSlice";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage } from "@hookform/error-message";
import { useParams, useNavigate } from "react-router-dom";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getDay from "date-fns/getDay";

const defaultValues = {
  date: "",
};

const ServiceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state.auth);
  const { loadingOneService, service } = useSelector((state) => state.bookings);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useLayoutEffect(() => {
    dispatch(waitingGetService());
    dispatch(getServiceByID({ id }));
    dispatch(getAllBookings({ serviceID: id }))
  }, [dispatch, id]);

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [navigate, isLogged]);

  const onSubmit = (data) => {
    console.log(data);
    /* dispatch(createBooking({
      date: data.date,
      service: id
    }));
    reset(defaultValues) */
  };

  if (loadingOneService || JSON.stringify({}) === JSON.stringify(service))
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
        <small> Aspettando info sul servizio e sulle disponibilita' dalle nostre sedi... </small>
      </div>
    );
  else {
    // Inizio orario lavorativo
    const START_TIME = 9;
    // Fine orario lavorativo
    const END_TIME = 17;
    const isWeekday = (date) => {
      const day = getDay(date);
      return day !== 0 && day !== 6;
    };
    const filterPassedTime = (time) => {
      const currentDate = new Date();
      const selectedDate = new Date(time);

      return currentDate.getTime() < selectedDate.getTime();
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
                    Per quando vuoi prenotare?
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
                        timeIntervals={60}
                        minDate={new Date(Date.now())}
                        minTime={setHours(
                          setMinutes(new Date(), 0),
                          START_TIME
                        )}
                        maxTime={setHours(setMinutes(new Date(), 0), END_TIME)}
                        placeholderText="Seleziona una data"
                        onChange={(date) => {
                          if (date.getTime() > Date.now())
                            return field.onChange(date);
                          return field.onChange("");
                        }}
                        selected={field.value}
                        showTimeSelect
                        filterTime={filterPassedTime}
                        id="date"
                        isClearable
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    )}
                  />
                  <ErrorMessage
                    as={<p className="text-red-600" />}
                    errors={errors}
                    name="date"
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
