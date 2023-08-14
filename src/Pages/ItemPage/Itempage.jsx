import React, { Fragment } from 'react'
import Header from '../../Component/Header/Headers'
import Menu from '../../Component/Menu/Menu'
import Item from '../../Component/Item/Item'
import Footer from '../../Component/Footer/Footer'

const Itempage = () => {
  return (
    <Fragment>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <Item />
      </div>
      <Footer />
    </Fragment>
  )
}

export default Itempage
