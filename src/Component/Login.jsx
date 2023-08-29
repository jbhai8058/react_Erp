import axios from 'axios';
import React, { useState } from 'react'
import { Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'

const Login = (props) => {


  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [message, setmessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const formsubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }

    axios.post('/login', data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', JSON.stringify(token)); // Convert to JSON string
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
    return <Navigate to='/dashboard' />;
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
          <h3 className='text-center'>Login Account</h3>
          <form onSubmit={formsubmit} id='forgetform'>
            {error}
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setemail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" placeholder="Password" onChange={(e) => setpassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-outline-success btn-block">Login</button><br /><br />
            Forget Password <Link to='/forget'>Click Here</Link><br />
            Don,t Have an Account <Link to='/register'>Click Here</Link>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
