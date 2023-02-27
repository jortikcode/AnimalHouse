import { useDispatch, useSelector } from "react-redux";
import { clearErrorUser } from "../app/usersSlice";
import ErrorModal from "../common/ErrorModal";
import LoginCard from "../components/Auth/LoginCard";
import RegisterCard from "../components/Auth/RegisterCard";

const LoginRegisterPage = ({ login = false, signup = false }) => {
  const { errorMsg } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  return (
    <>
      <ErrorModal msg={errorMsg} clearErrorFunction={() => dispatch(clearErrorUser())} />
      <div className="mt-12">
        {login && <LoginCard />}
        {signup && <RegisterCard />}
      </div>
    </>
  );
};

export default LoginRegisterPage;
