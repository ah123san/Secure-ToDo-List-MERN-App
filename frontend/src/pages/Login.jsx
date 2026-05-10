import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // 1. Imported toast function

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // 2. Loading toast while request is processing
    const toastId = toast.loading('Verifying details...');

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // 3. Success toast replacing the default alert
      toast.success('Welcome Back!', { id: toastId });
      
      navigate('/');
    } catch (error) {
      // 4. Error toast for invalid credentials
      toast.error(error.response?.data?.message || 'Login Failed', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Login</h2>
        
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-6 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 hover:shadow-lg transition-all duration-200">
          Sign In
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;