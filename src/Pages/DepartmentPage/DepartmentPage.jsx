import React, { Fragment } from 'react'
import Header from '../../Component/Header/Header'
import Menu from '../../Component/Menu/Menu'
import Department from '../../Component/Department/Department'
import Footer from '../../Component/Footer/Footer'

const DepartmentPage = () => {
    return (
        <Fragment>
            <Header />
            <Menu />
            <div className="content-wrapper">
                <Department />
            </div>
            <Footer />
        </Fragment>
    )
}

export default DepartmentPage
