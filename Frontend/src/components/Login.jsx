import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';
import { URL } from '../url.js';
import TopBar from './Topbar';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/user/me`, { withCredentials: true });
        if (response.data.authenticated) {
          setAuthState({
            authenticated: true,
            user: response.data.user,
            loading: false,
          });
          navigate('/dashboard');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkAuth();
  }, [navigate, setAuthState]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/v1/user/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        setAuthState({
          authenticated: true,
          user: res.data.user,
          loading: false,
        });
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during login.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <div className="login-container flex flex-col items-center justify-center flex-1 bg-[#edece3] px-6 py-8 md:px-10">
        <h2 className="text-3xl text-black font-bold mb-8">Log In</h2>
        <form onSubmit={onSubmitHandler} className="flex flex-col space-y-4 w-full max-w-md">
          <label htmlFor="email" className="text-gray-800 font-medium">Email:</label>
          <input
            type="email" id="email" value={email} required
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="appearance-none rounded-md border bg-white border-gray-900 px-3 py-2 focus:ring-2 focus:ring-blue-600 placeholder-gray-700"
          />
          <label htmlFor="password" className="text-gray-800 font-medium">Password:</label>
          <input
            type="password" id="password" value={password} required
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="appearance-none rounded-md border bg-white border-gray-900 px-3 py-2 focus:ring-2 focus:ring-blue-600 placeholder-gray-700"
          />
          <p className='text-center text-black my-2'>Don&apos;t have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link></p>
          <button type="submit" className="bg-[#37896C] hover:bg-[#006D5F] text-white font-bold py-2 px-4 rounded-md focus:outline-none">
            Log In
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login;
