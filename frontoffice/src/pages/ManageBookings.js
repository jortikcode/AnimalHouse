import { useLayoutEffect } from "react";
import { FidgetSpinner } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings, waitingGetAllBookings } from "../app/servicesSlice";
import Booking from "../components/PersonalArea/Booking";

const ManageBookings = () => {
  const { user } = useSelector((state) => state.auth);
  const { bookings, loadingBookings } = useSelector((state) => state.bookings);
  const { _id: userID } = user.userInfo;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(waitingGetAllBookings());
    dispatch(getAllBookings({ userID }));
  }, [dispatch, userID]);

  if (loadingBookings)
    return (
      <div className="flex mt-8 justify-center">
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
        <small> Caricando i post dai nostri uffici... </small>
      </div>
    );
  if (bookings.length === 0)
    return (
      <h2 className="font-bold text-3xl text-center mt-8">
        {" "}
        Non hai prenotazioni effettuate
      </h2>
    );
  return (
    <div className="grid grid-cols-1 mb-8 mt-8 mx-4 items-stretch gap-y-4">
      {bookings.map((booking, index) => {
        return <Booking {...booking} key={index} />;
      })}
    </div>
  );
};

export default ManageBookings