import React, { Fragment } from 'react'
import Menu from '../../Component/Menu/Menu'
import Header from '../../Component/Header/Header'
import Dashboard from '../../Component/Dashboard/Dashboard'
import Footer from '../../Component/Footer/Footer'

const MainPage = () => {
  return (
    <Fragment>
        <Header />
        <Menu />
        <Dashboard />
        <Footer />
    </Fragment>
  )
}

export default MainPage
