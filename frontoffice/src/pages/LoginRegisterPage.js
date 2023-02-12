import LoginCard from "../components/Auth/LoginCard";
import RegisterCard from "../components/Auth/RegisterCard";

const LoginRegisterPage = ({ login = false, signup = false }) => {
    return (
    <div className="mt-12">
    { login && (<LoginCard />)  }
    { signup && (<RegisterCard />) }
    </div>
    )
}

export default LoginRegisterPage;