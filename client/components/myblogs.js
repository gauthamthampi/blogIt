'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { localhost } from '../url';

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null); 
  const token = localStorage.getItem('tokenblogIt');
  
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token); 
      setEmail(decodedToken.email); 
    }
    fetchUserBlogs();
  }, []);

  const fetchUserBlogs = async () => {
    try {
      const response = await axios.get(`${localhost}/api/fetch-userblogs`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('writtenby', email); 
    formData.append('createdAt', new Date().toISOString());

    try {
      let response;
      if (currentBlogId) {
        response = await axios.put(`${localhost}/api/editblog/${currentBlogId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        fetchUserBlogs();
      } else {
        response = await axios.post(`${localhost}/api/addblog`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        fetchUserBlogs();
      }
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error('Error submitting blog:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
    setImagePreview(null);
    setCurrentBlogId(null);
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setImagePreview(`${localhost}${blog.image}`);
    setCurrentBlogId(blog._id); 
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${localhost}/api/deleteblog/${blogToDelete._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchUserBlogs();
      setShowDeleteModal(false); 
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Blogs</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add Blog
        </button>
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
                    src={`${localhost}${blog.image}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
                  <p className="mt-2 text-gray-600">
                    {blog.content ? blog.content.slice(0, 60) : 'No content available'}...
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => handleEdit(blog)}>
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => {setBlogToDelete(blog); setShowDeleteModal(true);}}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
 
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{currentBlogId ? 'Edit Blog' : 'Add a New Blog'}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Content
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="w-full"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-full h-48 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="mt-2 text-red-500"
                      onClick={handleRemoveImage}
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : currentBlogId ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Delete Blog</h2>
            <p>Are you sure you want to delete this blog titled <strong>{blogToDelete?.title}</strong>? This action cannot be undone.</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
