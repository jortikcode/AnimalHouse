import { FidgetSpinner } from "react-loader-spinner";
import { useSelector } from "react-redux";
import PetCard from "../components/PersonalArea/PetCard";
import PetForm from "../components/PersonalArea/PetForm";

const ManagePets = () => {
  const { user, updatedAnimals } = useSelector((state) => state.auth);
  const { animaliPreferiti } = user.userInfo;
  if (!updatedAnimals)
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
  if (animaliPreferiti.length === 0)
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
          { animaliPreferiti.map((animale, index) => <PetCard key={index} {...animale} />) }
          </>
        )}
        <PetForm />
      </>
    );
};

export default ManagePets;
