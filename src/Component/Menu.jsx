import React, { Fragment, useEffect, useState } from 'react'
import RestClient from '../Rest Api/RestClient';
import AppUrl from '../Rest Api/AppUrl';

const Menu = () => {

    const [Data, setData] = useState([]);

    useEffect(() => {
        RestClient.GetRequest(AppUrl.asidebar).then((result) => {
            console.log(result)
            setData(result);
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    const renderMenuItems = () => {
        if (Data && Data.mainNavModules && Data.subMainNavModules && Data.asidebarData) {
            return Data.mainNavModules.map(mainNavItem => (
                <li className="nav-item" key={mainNavItem.id}>
                    <a href="#" className="nav-link">
                        <p>
                            {mainNavItem.module_name}
                            <i className="right fas fa-angle-left" />
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        {Data.subMainNavModules.map(subNavItem => (
                            <li className="nav-item" key={subNavItem.id}>
                                <a href="#" className="nav-link">
                                    <p>
                                        {subNavItem.sub_module_name}
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    {Data.asidebarData.map(asidebarItem => (
                                        <li className="nav-item" key={asidebarItem.id}>
                                            <a href="#" className="nav-link">
                                                <p>{asidebarItem.vr_title}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </li>
            ));
        } else {
            return null;
        }
    };

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
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {renderMenuItems()}
                        </ul>
                    </nav>
                </div>
            </aside>

        </Fragment>
    )
}

export default Menu
