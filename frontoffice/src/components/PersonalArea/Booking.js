import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBooking } from "../../app/servicesSlice";

const Booking = ({ _id, service, user, date }) => {
    const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-center px-4">
      <div className="max-w-4xl  bg-yellow-500 border-4 border-black w-full rounded-lg shadow-xl">
        <div className="p-4 border-b border-black-2 border-amber-800">
          <h2 className="text-3xl "> { service.serviceName } </h2>
          <p className="text-black"> Per dettagli sul servizio, cliccare <Link to={`/services/${service._id}`} className=" text-cyan-900 underline"> qui </Link></p>
          <p className="text-sm text-black"> {service.isVip ? "Servizio VIP" : "Servizio non VIP"}</p>
        </div>
        <div>
          <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-black">
            <p className="text-black">Nome associato alla prenotazione</p>
            <p> { user.name } { user.surname } </p>
          </div>
          <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-black">
            <p className="text-black"> Prezzo della seduta </p>
            <p> { service.price } </p>
          </div>
          <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-black">
            <p className="text-black">Indirizzo email</p>
            <p> { user.email } </p>
          </div>
          <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-black">
            <p className="text-black">Data della prenotazione</p>
            <p> { new Date(date).toLocaleString() } </p>
          </div>
          <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-black">
            <p className="text-black"> Sul servizio </p>
            <p>
              { service.description }
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b border-black">
            <p className="text-black"> Azioni </p>
            <button type="button" className="text-white bg-black w-fit p-2 rounded-xl" onClick={e => dispatch(deleteBooking({ bookingID: _id }))}> Cancella </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
