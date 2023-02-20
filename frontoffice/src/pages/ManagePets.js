import { FidgetSpinner } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { removePets } from "../app/usersSlice";
import PetCard from "../components/PersonalArea/PetCard";
import PetForm from "../components/PersonalArea/PetForm";

const ManagePets = () => {
  const { user, updatingUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const { animaliPreferiti } = user.userInfo;
  if (updatingUser)
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
      </div>
    );
  return (
    <>
      {animaliPreferiti.length === 0 && (
        <h2 className="font-bold text-3xl text-center mt-8">
          {" "}
          Non ci sono animali a tuo carico!
        </h2>
      )}
      {animaliPreferiti.length > 0 && (
        <>
          <h2 className="font-bold text-3xl text-center mt-8">
            {" "}
            I tuoi animali
          </h2>
          <div className="flex justify-center my-3">
            <button type="button" onClick={e => dispatch(removePets())} className="w-fit rounded-xl p-3 bg-yellow-400 text-black"> 
            Cancella tutti gli animali 
            </button>
          </div>
          <div className="mt-4 flex flex-col items-center gap-y-5">
          {animaliPreferiti.map((animale, index) => (
            <PetCard key={index} {...animale} />
          ))}
          </div>
        </>
      )}
      <PetForm />
    </>
  );
};

export default ManagePets;
