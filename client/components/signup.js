'use client';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { localhost } from '../url';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [firstname, setFirstname] = useState('');
  const [secondname, setSecondname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input changes
  const handleFirstnameChange = (e) => setFirstname(e.target.value);
  const handleSecondnameChange = (e) => setSecondname(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Basic validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(false);

    const userData = { firstname, secondname, email, password };

    try {
      const response = await axios.post(`${localhost}/api/signup`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setSuccess('Signup successful! Redirecting to login...');
        setLoading(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000); // Redirect after 3 seconds
      } else {
        setError(response.data.message); // Handle backend error
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'An error occurred. Please try again.');
      } else if (err.request) {
        setError('No response from the server. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md border border-[#734b6d]">
        <h2 className="text-2xl font-bold text-center text-[#734b6d]">Signup</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && (
          <div className="text-green-500 text-center">
            <p>{success}</p>
            {loading && (
              <div className="flex items-center justify-center mt-2">
                <div className="loader mr-2"></div>
                
              </div>
            )}
          </div>
        )}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            id="firstname"
            placeholder="Firstname"
            name="firstname"
            type="text"
            value={firstname}
            onChange={handleFirstnameChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg"
          />
          <input
            id="secondname"
            placeholder="Secondname"
            name="secondname"
            type="text"
            value={secondname}
            onChange={handleSecondnameChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg"
          />
          <input
            id="email"
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg"
          />
          <input
            id="password"
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg"
          />
          <input
            id="confirmPassword"
            placeholder="Confirm password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-[#42275a] to-[#734b6d] rounded-lg hover:from-[#301d3f] hover:to-[#50344f]"
          >
            Signup
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Spinner CSS */}
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3; /* Light grey */
          border-top: 4px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
