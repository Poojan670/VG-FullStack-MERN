

import React, { useState } from 'react'
import {
    Nav, NavLink, Bars, NavMenu, NavBtn,
    NavBtnLink, NavProfile
} from '../assets/wrapper/NavBar'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'


const NavBar = () => {

    const auth = localStorage.getItem("x-authorization");
    const user = localStorage.getItem("user");
    const [showLogout, setShowLogout] = useState(false)
    const { logOutUser } = useAppContext();
    const data = JSON.parse(user)


    return (
        <main>
            <Nav>
                <Link to='/games'>
                    <Logo />
                </Link>
                <h4 className='logo-title' style={{ marginRight: "55rem" }}>VG-APP</h4>
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/"
                        activeStyle={{ color: 'black' }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/games"
                        activeStyle={{ color: 'black' }}
                    >
                        Games
                    </NavLink>
                    <NavLink
                        to="/devs"
                        activeStyle={{ color: 'black' }}
                    >
                        Devs
                    </NavLink>
                    {auth ? (
                        <NavLink
                            to="/signin"
                            activeStyle={{ color: 'black' }}>
                            Sign Out
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/signin"
                            activeStyle={{ color: 'black' }}>
                            Sign In
                        </NavLink>
                    )}

                    <div className='btn-container'>
                        <button
                            type='button'
                            className='btn'
                            onClick={() => setShowLogout(!showLogout)}
                        >
                            <FaUserCircle />
                            {data.name}
                            <FaCaretDown />
                        </button>
                        <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                            <button type='button' className='dropdown-btn' onClick={logOutUser}>
                                logout
                            </button>
                        </div>
                    </div>

                    {/* <NavProfile>
                        <img src="https://pbs.twimg.com/profile_images/731462042662494208/lhxjirl-_400x400.jpg" alt="gintoki" className='img' />
                        <i class="fa fa-caret-down"></i>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </NavProfile> */}
                </NavMenu>
            </Nav>
        </main>
    )
}

export default NavBar