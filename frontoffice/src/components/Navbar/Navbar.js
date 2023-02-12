import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../app/usersSlice";
import menuLogged from "./menuLogged.json";
import menuGuest from "./menuGuest.json";
import { baseMediaUrl } from "../../index";

const Navbar = () => {
  const { isLogged } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [ menuItems, setMenuItems ] = useState(isLogged ? menuLogged : menuGuest)
  console.log(`${baseMediaUrl}/black-logo.png`)
  useEffect(() => {
    // Al logout / login, la navbar deve cambiare (e.g. non deve essere piu' possibile fare accedi/uscire )
    if (isLogged)
      setMenuItems(menuLogged)
    else
      setMenuItems(menuGuest)
  }, [ isLogged ])

  return (
    <nav className="w-full bg-yellow-500 p-5 md:flex md:items-center md:flex-row md:justify-between flex-col md:justify">
      <div>
        <Link to="/"> 
          <img src={`${baseMediaUrl}/black-logo.png`} className="text-2xl font-bold font-Poppins cursor-pointer w-[220px] max-w-full" />
        </Link>
      </div>
      <ul className="flex md:flex-row flex-col" aria-labelledby="dropdownDefaultButton">
        {menuItems.map((item, index) => {
          switch(item.link){
            case "/logout":
              return (
                <li className="mx-4 mt-6 md:my-0" key={index}>
                  <button className="text-lg font-semibold" type="button" onClick={e => dispatch(logout())}>
                    Esci
                  </button>
                </li>
              )
            default:
              return (
              <li className="mx-4 mt-6 md:my-0" key={index}>
                <Link
                  to={item.link}
                  className="text-lg font-semibold"
                >
                  {item.value}
                </Link>
              </li>
              )
          }
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
