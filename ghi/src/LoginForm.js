
import React, { useState } from 'react';

function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to login');
      }
      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      console.log('Login successful');
      onLoginSuccess(); // Call the callback function to navigate

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;















// import React, { useState } from 'react';

// function LoginForm({ onLoginSuccess }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8000/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to login');
//       }
//       const data = await response.json();
//       localStorage.setItem('accessToken', data.access);
//       localStorage.setItem('refreshToken', data.refresh);
//       console.log('Login successful');
//       onLoginSuccess(); // Call the callback function to navigate

//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-blue-200">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6">Login</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <div className="mb-4">
//           <label htmlFor="username" className="block mb-2">Username:</label>
//           <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="password" className="block mb-2">Password:</label>
//           <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
//         </div>
//         <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;
