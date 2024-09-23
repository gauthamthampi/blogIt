'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BlogHome() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs'); 
        setBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No blogs available at the moment. Please check back later.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-lg p-4">
              <img
                src={blog.coverPhoto}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
              <p className="mt-2 text-gray-600">{blog.content.slice(0, 100)}...</p>
              <p className="mt-2 font-bold">By {blog.writer}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
