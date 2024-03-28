import React from 'react';

function LogoutForm({ onLogout }) {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        console.log('Logout successful');
        localStorage.removeItem('token'); // Remove token from local storage
        onLogout(); // Call the callback function to perform additional logout actions
      } else {
        console.error('Failed to log out:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200">
      <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Logout</button>
    </div>
  );
}

export default LogoutForm;
