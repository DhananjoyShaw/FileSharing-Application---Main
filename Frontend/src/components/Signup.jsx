import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../url.js';
import TopBar from './Topbar';
import Footer from './Footer';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(`${URL}/api/v1/user/me`, { withCredentials: true });
                navigate('/dashboard');
            } catch (error) {
                console.log(error.message);
            }
        };
        checkAuth();
    }, [navigate]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${URL}/api/v1/user/register`, {
                fullName, email, password, confirmPassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar />
            <div className="signup-container flex flex-col items-center justify-center flex-1 bg-[#edece3] px-6 py-8 md:px-10">
                <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
                <form onSubmit={onSubmitHandler} className="flex flex-col space-y-4 w-full max-w-md">
                    <label htmlFor="fullName" className="text-gray-700 font-medium">Full Name:</label>
                    <input
                        type="text" id="fullName" value={fullName} required
                        onChange={(event) => setFullName(event.target.value)}
                        className="appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="email" className="text-gray-700 font-medium">Email:</label>
                    <input
                        type="email" id="email" value={email} required
                        onChange={(event) => setEmail(event.target.value)}
                        className="appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="password" className="text-gray-700 font-medium">Password:</label>
                    <input
                        type="password" id="password" value={password} required
                        onChange={(event) => setPassword(event.target.value)}
                        className="appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password:</label>
                    <input
                        type="password" id="confirmPassword" value={confirmPassword} required
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="appearance-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className='text-center my-2'>Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link></p>
                    <button type="submit" className="bg-[#37896C] hover:bg-[#006D5F] text-white font-bold py-2 px-4 rounded-md focus:outline-none">
                        Sign Up
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Signup;
