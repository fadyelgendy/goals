import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const leave = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/");
    }

    return (
        <header className="fixed top-0 right-0 w-full flex justify-between align-middle items-center bg-white border-b-2 h-14 px-5">
            <div>
                <Link to="/" className="text-xl font-bold">Goals</Link>
            </div>

            <div className="flex justify-center align-middle items-center space-x-5">
                {user ? (
                    <button onClick={leave} className="flex justify-start align-middle items-center space-x-1 hover:text-gray-700 duration-150">
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="flex justify-start align-middle items-center space-x-1 hover:text-gray-700 duration-150">
                            <FaSignInAlt />
                            <span>Login</span>
                        </Link>

                        <Link to="/register" className="flex justify-start align-middle items-center space-x-1 hover:text-gray-700 duration-150">
                            <FaUser />
                            <span>Rgister</span>
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header