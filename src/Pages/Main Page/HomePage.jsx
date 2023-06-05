import React, { Fragment } from 'react'
import Menu from '../../Component/Menu/Menu'
import Header from '../../Component/Header/Header'
import Dashboard from '../../Component/Dashboard/Dashboard'
import Footer from '../../Component/Footer/Footer'

const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <Dashboard />
      </div>
      <Footer />
    </Fragment>
  )
}

export default HomePage
