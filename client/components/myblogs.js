'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { localhost } from '../url';

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tokenblogIt');
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`${localhost}/api/blogs/user`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Blogs</h1>
        <Link href="/add-blog">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add Blog
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {blogs.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              You have not written any blogs yet.
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
                  <Link href={`/blog/${blog._id}`}>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                      Read More

                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}



