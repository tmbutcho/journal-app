import React, { useState } from 'react';

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/sign-up/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('User created successfully');
        // Optionally, you can redirect or show a success message here
      } else {
        console.error('Failed to create user:', response.statusText);
        // Optionally, you can show an error message here
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Optionally, you can show an error message here
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up!!!!</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
