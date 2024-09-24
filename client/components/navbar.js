'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { localhost } from '../url';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tokenblogIt');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`${localhost}/api/user/${email}`, {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            });
            setUser(response.data); 
            console.log(response.data);            
          } catch (err) {
            console.error('Failed to fetch user data', err);
            if (err.response?.status === 401 && err.response.data.message === 'Token expired, please log in again') {
              localStorage.removeItem('tokenblogIt'); 
              window.location.href = '/login'; 
            }
          }
        };

        fetchUserData();
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tokenblogIt');
    window.location.href = '/login';
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-[#42275a] to-[#734b6d] p-4 flex justify-between items-center">
        <div className="flex items-center">
        <Link href="/home">
            <span role="img" aria-label="logo" className="font-pacifico text-2xl text-white cursor-pointer">
              blogIt📝
            </span>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="flex space-x-4">
            {user ? (
              <>
               <button
                  onClick={() => window.location.href = '/myblogs'}
                >
                <span className="text-white font-bold px-4 py-2 hover:bg-[#5e3f6a]  rounded-md">
                  {user.firstname}
                </span></button>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-[#5e3f6a] px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              // Otherwise, show Login and Signup buttons
              <>
                <Link href="/login" className="text-white hover:bg-[#5e3f6a] px-4 py-2 rounded-md">
                  Login
                </Link>
                <Link href="/signup" className="text-white hover:bg-[#5e3f6a] px-4 py-2 rounded-md">
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
