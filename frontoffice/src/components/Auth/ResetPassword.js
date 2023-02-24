import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../app/usersSlice";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const sentEmailMsg = "Email inviata";

function ResetPassword() {
  const dispatch = useDispatch();
  const { isLogged, resetPassword } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(forgotPassword({ email: data.email }));
  };

  useEffect(() => {
    // L'utente e' gia' loggato, lo rimandiamo alla Home
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

  return (
    <>
      {!isLogged && resetPassword?.msg !== "Email inviata" && (
        <div className="flex items-center flex-col mt-12">
          <div className="prose">
            {" "}
            <h1> Reset della password </h1>{" "}
          </div>
          <form
            autoComplete="off"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Email mancante",
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
                value="Invia email"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
      {!isLogged && resetPassword?.msg === "Email inviata" && (
        <div className="flex items-center flex-col mt-12 p-2">
          <div className="prose mb-4">
            {" "}
            <h1> Reset della password </h1>{" "}
          </div>
          <p  className="block text-gray-700 font-bold mb-2"> Email inviata, potrebbe volerci un po' prima di ricevere l'email. </p>
          <p className="block text-gray-700 font-bold mb-2"> Se non dovesse arrivare ti preghiamo di ricaricare questa pagina e re-inserire l'email</p>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
