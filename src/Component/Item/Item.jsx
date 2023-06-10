import React, { Fragment } from 'react'
import { Link, Route, BrowserRouter as Router, Routes, } from 'react-router-dom'

const Item = () => {

  const AddUpdate = () => {
    return (
      <div className="tab-pane active">
        <h1>item</h1>
      </div>
    );
  };

  const List = () => {
    return (
      <div className="tab-pane fade">
        <h1>search</h1>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="container-fluid">
            <div className="w-full p-3 bg-white border border-gray-200 rounded-lg mt-2">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                  <h1 className='text-sm text-md text-lg font-weight-bold text-uppercase'>Add Item</h1>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                  <div className="float-right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <ul className='nav nav-pills'>
                      <li className='nav-item'><Link className='nav-link active' to='/additem'>Add / Update</Link></li>
                      <li className='nav-item'><Link className='nav-link' to='/search'>List</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="tab-content">
                      <Routes>
                        <Route path="/additem" className="tab-pane active" element={<AddUpdate />} />
                        <Route path="/search" className="tab-pane fade" element={<List />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Item
