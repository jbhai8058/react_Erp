import React, { Fragment, useEffect, useState } from 'react'
import RestClient from '../../Rest Api/RestClient';
import AppUrl from '../../Rest Api/AppUrl';
import axios from 'axios';

const Menu = () => {



    const [data, setData] = useState(null);

    useEffect(() => {
        RestClient.GetRequest(AppUrl.data).then((response) => {
            setData(response);
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    const MyView = data ? (
        data.map(myItem => (
            <li className="nav-item" key={myItem.id}>
                <a href="#" className="nav-link">
                    {/* <i className="far fa-circle nav-icon"></i> */}
                    <p>
                        {myItem.module_name}
                        <i className="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul className="nav nav-treeview">
                    {myItem.SubmainnavModules.map(submainnavModule => (
                        <li className="nav-item" key={submainnavModule.id}>
                            <a href="#" className="nav-link">
                                {/* <i className="far fa-dot-circle nav-icon"></i> */}
                                <p>
                                    {submainnavModule.sub_module_name}
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                {submainnavModule.Asidebars.map(asidebars => (
                                    <li className="nav-item" key={asidebars.id}>
                                        <a href="#" className="nav-link">
                                            {/* <i className="far fa-dot-circle nav-icon"></i> */}
                                            <p>{asidebars.vr_title}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </li>
        ))
    ) : null;





    return (
        <Fragment>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">AdminLTE 3</span>
                </a>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <nav className="mt-3">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {MyView}
                        </ul>
                    </nav>
                </div>
            </aside>



        </Fragment>
    )
}

export default Menu
