import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export const Navbar = (props) => {
    const { logout, token } = props
    return(

            <div className="navbar">
                <Link to='/discover'>
                    <h1 className="navbar-discover">
                        Public Takes
                    </h1>
                </Link>

                <Link to='/profile'>
                    <h1 classname="navbar-profile">
                        My Profile
                    </h1>
                </Link>

                { token ? <button onClick={logout} className="logout-btn"> Logout </button> : <></>}
            </div>

    )
}