import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom';

export default function Profile(props) {

  let name;
  let email;

  if (props.user) {
    name = props.user.name;
    email = props.user.email;
  }

  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />;
  }

  console.log(email)

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <div className="row">
        <div className="jumbotron col-lg-4 offset-lg-4">
          <h3 className='text-center'>User Profile</h3>
          <ul class="list-group">
            <li class="list-group-item">Name : {name}</li>
            <li class="list-group-item">Email : {email}</li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}
