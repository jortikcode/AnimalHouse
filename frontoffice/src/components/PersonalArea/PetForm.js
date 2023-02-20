import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUser } from "../../app/usersSlice";
import InfoTooltip from "../Auth/InfoTooltip";

const defaultValues = {
    name: "",
    birthYear: "2023",
    imageName: "default_pet_image.jpg",
    particularSigns: "",  
}

const PetForm = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues
  });

  const onSubmit = (data) => {
    console.log(data)
    dispatch(updateUser({ userInfo: {
        animaliPreferiti: [
          {
            ...data
          }
        ]
    }, petInsert: true }))
    
    reset(defaultValues)
  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={(e) => setShowForm((old) => !old)}
          className="inline-block px-6 py-2.5 bg-yellow-400 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg transition duration-150 ease-in-out"
        >
          {showForm ? "Nascondi" : "Registra un nuovo animale"}
        </button>
      </div>
      {showForm && (
        <form
          className="flex flex-col items-center justify-center gap-y-4 my-8"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageName"
            >
              Foto profilo
            </label>
            <input id="imageName" type="file" {...register("imageName")} />
          </div>
          <div className="flex flex-col items-center">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              {...register("name", {
                required: "Inserire un nome",
                pattern: {
                  value: /^\w*$/,
                  message: "Nome non valido",
                },
              })}
            />
            <ErrorMessage
              as={<p className="text-red-600" />}
              errors={errors}
              name="name"
            />
          </div>
          <div className="flex flex-col items-center">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="animalType"
            >
              Di che animale si tratta?
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="animalType"
              type="text"
              {...register("animalType", {
                required: "Inserire un animale",
              })}
            />
            <ErrorMessage
              as={<p className="text-red-600" />}
              errors={errors}
              name="animalType"
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center gap-x-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="birthyear"
              >
                Anno di nascita
              </label>
              <InfoTooltip message="L'anno deve essere in formato YYYY" />
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthyear"
              type="text"
              {...register("birthYear", {
                pattern: {
                  value: /^([0-9][0-9][0-9][0-9])$/,
                  message: "Anno non valido",
                },
              })}
            />
            <ErrorMessage
              as={<p className="text-red-600" />}
              errors={errors}
              name="birthYear"
            />
          </div>
          <div className="flex flex-col items-center">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="particularSigns"
            >
              Segni particolari
            </label>
            <textarea
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              cols="25"
              rows="5"
              id="particularSigns"
              {...register("particularSigns")}
            />
          </div>
          <div className="flex flex-col items-center">
            <input
              className="inline-block px-6 py-2.5 bg-yellow-400 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg transition duration-150 ease-in-out"
              type="submit"
              value="Registra"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default PetForm;
