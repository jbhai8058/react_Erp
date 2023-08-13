import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

const Reset = () => {


  const [token, settoken] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [password_confirmation, setpassword_confirmation] = useState('');
  const [message, setmessage] = useState('');


  const formsubmit = (e) => {
    e.preventDefault();
    const data = {
      token: token,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    axios.post('/resetpassword', data)
      .then((response) => {
        setmessage(response.data.message)
        document.getElementById("formsubmit").reset();
      })
      .catch((error) => {
        setmessage(error.response.data.message)
      });

  }


  /// Show Error Message 
  let error = "";
  if (message) {
    error = (
      <div>
        <div class="alert alert-danger" role="alert" >
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
          <h3 className='text-center'>Reset Password</h3>
          <form onSubmit={formsubmit} id='formsubmit'>
            {error}
            <div className="form-group">
              <label for="exampleInputEmail1">Pin</label>
              <input type="text" className="form-control" placeholder="Enter Pin" onChange={(e) => settoken(e.target.value)} required />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setemail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">New Password</label>
              <input type="password" className="form-control" placeholder="New Password" onChange={(e) => setpassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Confirm Password</label>
              <input type="password" className="form-control" placeholder="Confirm Password" onChange={(e) => setpassword_confirmation(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-outline-success btn-block">Reset</button><br /><br />
            Already Have an Account <Link to='/login'>Click Here</Link>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Reset
