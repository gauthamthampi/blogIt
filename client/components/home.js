'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { localhost } from '@/url';

export default function BlogHome() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`${localhost}/api/fetch-allblogs`); 
        setBlogs(response.data);
        
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Read Latest Articles</h2>
        <p className="mt-4 text-lg leading-6 text-gray-500">
          Dive into insightful reads that inspire, inform, and ignite curiosity.
        </p>
      </div>

      {loading ? ( // Show loading spinner
        <div className="flex justify-center items-center h-48">
          <div className="loader"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No blogs available at the moment. Please check back later.
        </div>
      ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="relative">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <div className="w-full h-full bg-gray-200">
                <img
                  className="object-cover w-full h-full"
                  src={blog.aws ? blog.aws : `${localhost}${blog.image}`}
                  alt={blog.title}
                />
              </div>
            </div>
            <div className="mt-4">
            <p className="text-sm font-light text-gray-600">
                {formatDate(blog.createdAt)}
              </p>
              <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
              <p className="mt-2 text-base text-gray-500 line-clamp-2">{blog.content}</p>
            
              <a href={`/readblog/${blog._id}`} className="mt-3 text-base font-medium text-indigo-600 hover:text-indigo-500">
                Continue Reading &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
      )}
      
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 50px;
          height: 50px;
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
