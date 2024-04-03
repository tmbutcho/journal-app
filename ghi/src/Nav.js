import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  const accessToken = localStorage.getItem('accessToken');

  const handleLogout = async () => {
    try {
        // Make a request to the logout endpoint
        const response = await fetch('http://localhost:8000/logout/', {
            method: 'POST', // Assuming logout requires a POST request
            // Add any necessary headers, e.g., authentication headers
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        // Clear the access token from local storage
        localStorage.removeItem('accessToken');
        console.log('Logout successful');

        // Redirect to login page or perform any other actions as needed
        // For example, you can use window.location.href = '/login' to redirect to the login page
    } catch (error) {
        console.error('Logout error:', error);
        // Handle logout error, e.g., display an error message to the user
    }
};

  return (
    <nav className="bg-sky-600 py-4">
      <ul className="flex space-x-4 justify-start items-center">
        <li>
          <NavLink to="/" activeClassName="active-link" className="text-white hover:underline pb-5">Home</NavLink>
        </li>
        {!accessToken && (
          <>
            <li>
              <NavLink to="/login" activeClassName="active-link" className="text-white hover:underline pb-1">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup" activeClassName="active-link" className="text-white hover:underline pb-1">Sign Up</NavLink>
            </li>
          </>
        )}
        {accessToken && (
          <>
            <li>
              <NavLink to="/journals" activeClassName="active-link" className="text-white hover:underline pb-1">My Journal</NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
