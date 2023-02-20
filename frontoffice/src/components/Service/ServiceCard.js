import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ServiceCard = ({
  _id,
  serviceName,
  description,
  imgName,
  price,
  location,
  isVip = false
}) => {
  const { user } = useSelector(state => state.auth)
  return (
    <div className={`flex items-center justify-center ${isVip ? "bg-black text-yellow-400 border-red-700" : "bg-yellow-400 text-black border-black" } border-4  rounded-xl my-4 mx-4`}>
      <div className="px-6 py-3 w-[23rem] max-w-full">
        <p className="text-sm mx-auto rounded-xl w-fit p-2 bg-amber-700 text-white font-bold mb-3">
          {location.city}
        </p>
        <img
        src={`${process.env.REACT_APP_BASE_MEDIA_URL}/${imgName}`}
        alt="service"
        className="shadow-xl border-none rounded-l-xl"
        />

        <p className="font-bold text-3xl mt-2">{serviceName}</p>
        <p className="font-bold text-sm mt-2">{isVip ? "VIP" : ""}</p>

        <p className="mt-5">Prezzo a seduta: €{price}</p>
        <p className="font-light truncate"> {description} </p>

        {((user.userInfo.isVip && isVip) || (!isVip)) && <Link to={`/services/${_id}`} className="bg-yellow-500 text-black font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group gap-x-2">
          <svg aria-hidden="true" focusable="false" className="icon icon--larger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em">
            <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/>
            </svg>
	        <span>Prenota</span>
        </Link>}
      </div>
    </div>
  );
};

export default ServiceCard
