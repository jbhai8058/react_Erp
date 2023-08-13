import React, { Fragment,useState } from 'react'
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom'

const Nav = ({ setUser }) => {


        const logout = () => {
          localStorage.clear();
          setUser(null);
        }

    let button;
    let profile;

    if (localStorage.getItem('token')) {
        button = (
            <div>
                <Link className="nav-link" to='/' onClick={logout}>Logout</Link>
            </div>
        )
        profile = (
            <div>
                <Link className="nav-link" to='/profile'>Profile</Link>
            </div>
        )
    } else {
        button = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/register'>Register</Link>
                </li>
            </ul>
        )
    }


    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar w/ text</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                           {profile}
                        </li>
                    </ul>
                    <span className="navbar-text">
                        {button}
                    </span>
                </div>
            </nav>
        </Fragment>
    )
}


export default Nav;
