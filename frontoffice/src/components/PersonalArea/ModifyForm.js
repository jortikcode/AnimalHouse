import { useDispatch, useSelector } from "react-redux";
import { FidgetSpinner } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import {
  cancelAccount,
  updateUser,
  waitingUpdateUser,
} from "../../app/usersSlice";

const ModifyForm = () => {
  const dispatch = useDispatch();
  const { user, updatingUser } = useSelector((state) => state.auth);
  const [cancelButton, setCancelButton] = useState(false);
  const { name, surname, email, imgName } = user.userInfo;
  const defaultValues = {
    name,
    surname,
    email,
    imgName
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    const updateObj = {}
    if (data.name !== defaultValues.name)
        updateObj.name = data.name
    if (data.surname !== defaultValues.surname)
        updateObj.surname = data.surname
    if (data.email !== defaultValues.email)
        updateObj.email = data.email
    if (data.imgName !== defaultValues.imgName){
        updateObj.imgName = data.imgName[0]
    }
    if (JSON.stringify(updateObj) === JSON.stringify({})) return
    dispatch(waitingUpdateUser());
    dispatch(updateUser({ userInfo: updateObj }));
  };

  if (updatingUser)
    return (
      <div className="flex flex-col items-center mt-8 justify-center">
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#EFBB1A", "#EFBB1A", "#EFBB1A"]}
          backgroundColor="#0"
        />
        <small> Aggiornando i nostri database... </small>
      </div>
    );
  return (
    <div className="flex flex-col items-center mt-12">
      <h2 className="font-bold text-4xl">I tuoi dati</h2>
      <button
        onClick={(e) => setCancelButton(true)}
        type="button"
        className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded mt-6"
      >
        Cancellami
      </button>
      {cancelButton && (
        <div className="mt-1 mb-2 p-4 flex flex-col items-center">
          <p className="rounded-lg max-w-full break-words text-lg font-bold p-2">
            {" "}
            Sei sicuro? Una volta cancellato tutti i tuoi dati verranno
            cancellati e non avrai più accesso al tuo account{" "}
          </p>
          <button
            className="font-bold bg-red-600 text-white py-2 px-4 rounded"
            type="button"
            onClick={(e) => {
                dispatch(waitingUpdateUser())
                dispatch(cancelAccount())
            }}
          >
            {" "}
            Si, cancellami{" "}
          </button>
        </div>
      )}
      <form
        autoComplete="off"
        className="bg-white w-[500px] max-w-full rounded mt-8 p-4 mb-4 flex flex-col justify-center shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
            <label
                className="text-lg block text-gray-700 font-bold mb-2"
                htmlFor="imgName"
            >
                Foto profilo
            </label>
        <input id="imgName" type="file" {...register("imgName")} multiple={false} accept="image/png, image/gif, image/jpeg"/>
        </div>
        <div className="mb-4">
          <label
            className="text-lg block text-gray-700 font-bold mb-2"
            htmlFor="name"
          >
            Nome
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            {...register("name", {
              required: "Inserisci un nome",
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
            htmlFor="surname"
          >
            Cognome
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="surname"
            type="text"
            {...register("surname", {
              required: "Inserisci un cognome",
            })}
          />
          <ErrorMessage
            as={<p className="text-red-600" />}
            errors={errors}
            name="surname"
          />
        </div>

        <div className="mb-4">
          <label
            className="text-lg block text-gray-700 font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            {...register("email", {
              required: "Inserisci una mail",
            })}
          />
          <ErrorMessage
            as={<p className="text-red-600" />}
            errors={errors}
            name="email"
          />
        </div>
        <div className="justify-center flex">
          <input
            value="Modifica"
            className="bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ModifyForm;
