import LoginCard from "../components/Auth/LoginCard";
import RegisterCard from "../components/Auth/RegisterCard";

const LoginRegisterPage = ({ login = false, signup = false }) => {
    return (
    <>
    { login && (<LoginCard />)  }
    { signup && (<RegisterCard />) }
    </>
    )
}

export default LoginRegisterPage;