import React, { Fragment } from 'react'
import Menu from '../../Component/Menu/Menu'
import Dashboard from '../../Component/Dashboard/Dashboard'
import Footer from '../../Component/Footer/Footer'
import Headers from '../../Component/Header/Headers'

const HomePage = (props) => {

  let name;
  let email;

  if (props.user) {
    name = props.user.name;
    email = props.user.email;
  }

  return (
    <Fragment>
      <Headers />
      <Menu name={name} />
      <div className="content-wrapper">
        <Dashboard />
      </div>
      <Footer />
    </Fragment>
  )
}

export default HomePage
