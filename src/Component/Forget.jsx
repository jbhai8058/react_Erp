import axios from 'axios';
import React, { Fragment } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Forget(props) {


  const [email, setemail] = useState('');
  const [message, setmessage] = useState('');


  const formsubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    }

    axios.post('/forgetpassword', data)
      .then((response) => {
        // console.log(response);
        setmessage(response.data.message);
        document.getElementById("forgetform").reset();
      })
      .catch((error) => {
        // console.log(error);
        setmessage(error.response.data.message);
      });

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
          <h3 className='text-center'>Foget Password</h3>
          <form onSubmit={formsubmit} id="forgetform">
            {error}
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setemail(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-outline-success btn-block">Forget Password</button><br /><br />
            Already Have an Account <Link to='/login'>Click Here</Link><br />
            Don,t Have an Account <Link to='/login'>Click Here</Link>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
