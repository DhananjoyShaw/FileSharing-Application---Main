import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../url.js';

const TopBar = () => {
    const { authState, setAuthState } = useAuth();

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${URL}/api/v1/user/logout`, { withCredentials: true });
            setAuthState({
                authenticated: false,
                user: null,
                loading: false,
            });
            toast.success(res.data.message);
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to logout.');
        }
    }

    if (authState.loading) return null;

    return (
        <div className="flex flex-col md:flex-row bg-[#D1DCAF] items-center justify-between px-6 md:px-[100px] py-4 space-y-4 md:space-y-0">
            <h1 className="text-2xl font-mono text-black md:text-4xl font-extrabold">
                <Link to="/">FILEUP</Link>
            </h1>
            <div className="flex-[6]">
                <ul className="flex justify-center m-0 p-0 list-none">
                    <li className="text-lg cursor-pointer text-black mr-5 md:text-2xl">
                        <Link className="no-underline" to="/">HOME</Link>
                    </li>
                    <li className="text-lg cursor-pointer text-black mr-5 md:text-2xl">
                        <Link className="no-underline" to="/about">ABOUT US</Link>
                    </li>
                    {authState.authenticated && (
                        <li className="text-lg cursor-pointer text-black mr-5 md:text-2xl">
                            <Link className="no-underline" to="/dashboard">DASHBOARD</Link>
                        </li>
                    )}
                </ul>
            </div>
            <div className="flex items-center">
                {authState.authenticated ? (
                    <ul className="flex items-center">
                        <li className="mr-3">
                            <span className="bg-[#8EB4A1] hover:bg-[#63908C] text-gray-800 font-bold cursor-pointer py-2 px-4 rounded-md">
                                {authState.user?.fullName || 'User'}
                            </span>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="bg-[#37896C] hover:bg-[#006D5F] text-white font-bold py-2 px-4 rounded-md">
                                Logout
                            </button>
                        </li>
                    </ul>
                ) : (
                    <div className="flex items-center">
                        <Link to="/login" className="mr-3">
                            <button className="bg-[#37896C] hover:bg-[#006D5F] text-white font-bold py-2 px-4 rounded-md">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-[#8EB4A1] hover:bg-[#63908C] text-gray-800 font-bold py-2 px-4 rounded-md">
                                Signup
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopBar;
