'use client';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { localhost } from '../url';
import LoadingSpinner from './spinner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${localhost}/api/login`, { email, password });
      
      if (response.status === 200) {
        console.log('Login successful');
        localStorage.setItem('tokenblogIt', response.data.token);
        window.location.href = '/home'; 
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'An error occurred. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md border border-[#734b6d]">
        <h2 className="text-2xl font-bold text-center text-[#734b6d]">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading &&  <div className="flex items-center justify-center mt-2">
                <div className="loader mr-2"></div>
                <LoadingSpinner />
              </div>} {/* Show spinner when loading */}        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            placeholder='Email'
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            id="password"
            placeholder='Password'
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-[#42275a] to-[#734b6d] rounded-lg hover:from-[#301d3f] hover:to-[#50344f] focus:outline-none"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-sm">
           Don&apos;t have an account?
            <Link href="/signup" className="text-orange-600 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
