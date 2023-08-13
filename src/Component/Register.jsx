import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { Route, BrowserRouter as Router, Routes, Link, Navigate } from 'react-router-dom'

export default function Register(props) {


  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [password_confirm, setpassword_confirm] = useState('');
  const [message, setmessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  const formsubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      password_confirm: password_confirm
    }

    axios.post('/register', data)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setLoggedIn(true);
        props.setUser(response.data.user);
        setmessage(response.data.message);
        document.getElementById("forgetform").reset();
      })
      .catch((error) => {
        setmessage(error.response.data.message);
      });

  }

  if (loggedIn) {
    return <Navigate to='/profile' />;
  }

  // Show Error Message
  let error = "";
  if (message) {
    error = (
      <div>
        <div className="alert alert-danger" role="alert" >
          {message}
        </div>
      </div>
    )
  } // end error message

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <div className="row">
        <div className="jumbotron col-lg-4 offset-lg-4">
          <h3 className='text-center'>Register Account</h3>
          <form onSubmit={formsubmit} id='forgetform'>
            {error}
            <div className="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" className="form-control" placeholder="Enter Name" onChange={(e) => setname(e.target.value)} required />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setemail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" placeholder="Password" onChange={(e) => setpassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Confirm Password</label>
              <input type="password" className="form-control" placeholder="Confirm Password" onChange={(e) => setpassword_confirm(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-outline-success btn-block">Register</button><br /><br />
            Already Have an Account <Link to='/login'>Click Here</Link>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
