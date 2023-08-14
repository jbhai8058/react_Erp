import React from 'react'
import { Fragment } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import HomePage from '../../Pages/Main Page/HomePage';
import Itempage from '../../Pages/ItemPage/Itempage';
import DepartmentPage from '../../Pages/DepartmentPage/DepartmentPage';
const AppRouter = () => {

    return (
        <Router>
            <Fragment>
                <Routes>
                    <Route exact  path='/dashboard' element={<HomePage />} />
                    <Route exact  path='/item' element={<Itempage />} />
                    <Route exact  path='/deparment' element={<DepartmentPage />} />
                </Routes>
            </Fragment>
        </Router>
    )
}

export default AppRouter
