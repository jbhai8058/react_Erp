import React, { Fragment, useState,useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from '../Component/Home'
import Login from '../Component/Login'
import Register from '../Component/Register'
import Forget from '../Component/Forget'
import Reset from '../Component/Reset'
import Profile from '../Component/Profile'
import Nav from './Nav'
import axios from 'axios'
import HomePage from '../Pages/Main Page/HomePage'
import Itempage from '../Pages/ItemPage/Itempage'
import DepartmentPage from '../Pages/DepartmentPage/DepartmentPage'

export default function Header() {

    const [user, setUser] = useState({});


    useEffect(() => {
        axios.get('/currentuser')
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


    return (
        <Router>
            <Fragment>
                <Nav user={user} setUser={setUser} />
                <Routes>
                    {/* <Route exact path='/' element={<Home />} /> */}
                    <Route exact path='/' element={<Home />} />
                    <Route  path='/login' element={<Login user={user} setUser={setUser} />} />
                    <Route  path='/register' element={<Register user={user} setUser={setUser} />} />
                    <Route  path='/forget' element={<Forget />} />
                    <Route  path='/reset/:id' element={<Reset />} />
                    <Route  path='/profile' element={<Profile user={user} />} />
                    <Route  path='/dashboard' element={<HomePage />} />
                    <Route  path='/item' element={<Itempage />} />
                    <Route  path='/deparment' element={<DepartmentPage />} />
                </Routes>
            </Fragment>
        </Router>
    )
}
