import React from 'react'
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='header'>
        <ul>
            <li>
                <Link to="/login">
                    <FaSignInAlt/> Login
                </Link>
            </li>
            <li>
                <Link to="/register">
                    <FaUser/> register
                </Link>
            </li>
        </ul>
    </header>
  )
}
