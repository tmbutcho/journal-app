import React from 'react';
import { NavLink } from 'react-router-dom';

function MyNavBar() {
    return (
        <nav className="bg-gray-500 py-4">
            <ul className="flex space-x-4 justify-start items-center">
                <li>
                    <NavLink exact to="/" activeClassName='active-link' className="text-teal-400">Home</NavLink>
                </li>
                <li>
                    <NavLink exact to="/login" activeClassName='active-link' className="text-teal-400">Login</NavLink>
                </li>
                <li>
                    <NavLink exact to="/signup" activeClassName='active-link' className="text-teal-400">Sign Up</NavLink>
                </li>
                <li>
                    <NavLink exact to="/journals" activeClassName='active-link' className="text-teal-400">My Journal</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MyNavBar;