import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../app/usersSlice";
import menuLogged from "./menuLogged.json";
import menuGuest from "./menuGuest.json";
import { baseMediaUrl } from "../../index";
import Cart from "../Marketplace/Cart";

const Navbar = () => {
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState(isLogged ? menuLogged : menuGuest);
  const [ expanded, setExpanded ] = useState(false)

  useEffect(() => {
    // Al logout / login, la navbar deve cambiare (e.g. non deve essere piu' possibile fare accedi/uscire )
    if (isLogged) setMenuItems(menuLogged);
    else setMenuItems(menuGuest);
  }, [isLogged]);

  const toggleVisibility = () => {
    setExpanded(oldState => !oldState)
  }

  return (
    <header>
      <nav className="w-full border-b-4 border-black bg-yellow-500 p-5 md:flex md:items-center md:flex-row md:justify-between flex-col md:justify">
        <Link to="/">
          <img
            alt="animalhouse logo"
            src={`${baseMediaUrl}/black-logo.png`}
            className="text-2xl font-bold font-Poppins cursor-pointer w-[220px] max-w-full"
          />
        </Link>
        <button className={`md:hidden mt-6 mx-4`} onClick={e => toggleVisibility()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </button>
        <ul
          className={`md:flex md:flex-row flex-col md:items-center ${expanded ? "": "hidden"}`}
          aria-labelledby="dropdownDefaultButton"
        >
          {menuItems.map((item, index) => {
            switch (item.link) {
              case "/logout":
                return (
                  <li className="mx-4 mt-6 md:my-0" key={index}>
                    <button
                      className="text-lg font-semibold"
                      type="button"
                      onClick={(e) => dispatch(logout())}
                    >
                      Esci
                    </button>
                  </li>
                );
              case "/marketplace/cart":
                return (
                  <li className="mx-4 mt-6 md:my-0" key={index}>
                    <Cart />
                  </li>
                );
              default:
                return (
                  <li className="mx-4 mt-6 md:my-0" key={index}>
                    <Link to={item.link} className="text-lg font-semibold">
                      {item.value}
                    </Link>
                  </li>
                );
            }
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
