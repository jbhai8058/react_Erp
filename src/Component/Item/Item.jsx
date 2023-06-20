import React, { Fragment, useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import Pill1 from './pill1';
import { Nav } from 'react-bootstrap';

const Item = () => {

  const [activeKey, setActiveKey] = useState("1");

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };


  // Define content for each nav pills key
  const contentMap = {
    "1": <Pill1 />,
    "2": "Content for Pill 2",
    "3": "Content for Pill 3",
  };

  // Get the content based on the active key
  const activeContent = contentMap[activeKey];

  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="container-fluid">
            <div className="w-full p-3 bg-white border border-gray-200 rounded-lg mt-2">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-4">
                  <h1 className='text-sm text-md text-lg font-weight-bold text-uppercase'>Add Item</h1>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-8">
                  <div className="float-right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
                      <Nav.Item>
                        <Nav.Link eventKey="1">Pill 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2">Pill 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="3">Pill 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {activeContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Item
