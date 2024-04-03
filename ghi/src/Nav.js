
import React from 'react';
import { NavLink } from 'react-router-dom';

function MyNavBar() {
    return (
        <nav className="bg-sky-600 py-4">
            <ul className="flex space-x-4 justify-start items-center">
                <li>
                    <NavLink to="/" activeClassName="active-link" className="text-white hover:underline pb-5">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/login" activeClassName="active-link" className="text-white hover:underline pb-1">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/logout" activeClassName="active-link" className="text-white hover:underline pb-1">Logout</NavLink>
                </li>
                <li>
                    <NavLink to="/signup" activeClassName="active-link" className="text-white hover:underline pb-1">Sign Up</NavLink>
                </li>
                <li>
                    <NavLink to="/journals" activeClassName="active-link" className="text-white hover:underline pb-1">My Journal</NavLink>
                </li>
                <li>
                    <NavLink to="/journals/:id" activeClassName="active-link" className="text-white hover:underline pb-1">Entry Detail</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MyNavBar;
