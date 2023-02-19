import { useLayoutEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getServiceByID, waitingGetService } from "../../app/servicesSlice";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const { useParams } = require("react-router-dom");

const defaultValues = {
  date: Date.now(),
};

const ServiceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loadingOneService, service } = useSelector((state) => state.bookings);
  const { register, handleSubmit, control } = useForm({
    defaultValues,
  });

  useLayoutEffect(() => {
    dispatch(waitingGetService());
    dispatch(getServiceByID({ id }));
  }, [dispatch, id]);

  const onSubmit = (data) => {
    console.log(data);
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
        <small> Aspettando info sul servizio dalle nostre sedi... </small>
      </div>
    );
  else
    return (
      <section className="text-black overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="service"
              className="lg:w-1/2 w-full object-cover object-center rounded"
              src={`${process.env.REACT_APP_BASE_MEDIA_URL}/${service.imgName}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <p className="text-md title-font text-gray-800">
                {service.location.address}, {service.location.city}
              </p>
              <p className="text-gray-900 text-3xl title-font font-medium mb-1">{service.serviceName}</p>
              <p className="leading-relaxed">{service.description}</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    className="text-lg block text-gray-700 font-bold mb-2"
                    htmlFor="date">
                    Cosa cerchi?
                  </label>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        showIcon
                        placeholderText="Seleziona una data"
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        showTimeSelect
                        id="date"
                        isClearable
                      />
                    )}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="title-font font-medium text-2xl text-gray-900">€{service.price}</span>
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
};

export default ServiceDetails;
