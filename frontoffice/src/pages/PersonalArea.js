import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import personalItems from "./data/personalItems.json";

const PersonalArea = () => {
  const { isLogged, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);
  if (!isLogged) return <></>;
  else
    return (
      <>
        <h1 className="mt-8 text-center font-bold text-3xl tracking-tighter">
          {" "}
          Area utente{" "}
        </h1>
        <div className="flex justify-center">
        <Link to="/myarea/modify" className="border-4 border-black p-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg break-keep w-42 max-w-full">
          Modifica/Cancella dati
        </Link>
        </div>

        <h2 className="tracking-wide block text-black text-center text-2xl my-6">
          {" "}
          Bentornato, {user.userInfo.name} 💫{" "}
        </h2>
        <p className="text-black tracking-tighter text-center text-2xl my-6">
          {" "}
          Il tuo abbonamento:{" "}
          {user.userInfo.isVip && (
            <span className="text-yellow-500"> VIP </span>
          )}{" "}
          {!user.userInfo.isVip && (
            <span className="text-yellow-500"> GRATIS </span>
          )}{" "}
        </p>
        <ul>
          {personalItems.map((item, index) => (
            <li className={`grid grid-cols-8 gap-4 p-2`} key={index}>
              {" "}
              <Link
                className={`text-center border-4 border-black col-span-4 text-xl p-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg break-words`}
                to={item.link}
                style={{
                  gridColumnStart: index + 1,
                }}
              >
                {" "}
                {item.value}{" "}
              </Link>{" "}
            </li>
          ))}
        </ul>
          <Outlet />
      </>
    );
};

export default PersonalArea;
