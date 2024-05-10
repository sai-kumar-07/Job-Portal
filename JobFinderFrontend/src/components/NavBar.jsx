import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.jpg"

class NavBar extends Component {
    render() {
        const username = localStorage.getItem('username');
        return (
            <nav className='nav'>
                <img src={logo} className='logo' alt="Logo" />
                <div style={{flexGrow:1}}></div>
                <ul style={{display:"flex"}}>
                    <React.Fragment>
                        {username ? null : (
                            <>
                                <div className='nav-link'><Link className='nav-link-text' to="/login" >Login</Link></div>
                                <div className='nav-link'><Link className='nav-link-text nav-link-border' to="/register">Register</Link></div>
                            </>
                        )}
                        {username && <div className='nav-link'><Link className='nav-link-text nav-link-border' to="/jobs" >Jobs</Link></div>}
                        {username && <div className='nav-link'><Link className='nav-link-text nav-link-border' to="/profile" >Profile</Link></div>}
                        {username && <div className='nav-link'><Link className='nav-link-text' to="/log-out" >Log Out</Link></div>}
                    </React.Fragment>
                </ul>
            </nav>
        );
    }
}

export default NavBar;
