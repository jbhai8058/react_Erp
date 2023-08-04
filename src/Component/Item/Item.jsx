import React, { Fragment, useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import Pill1 from './pill1';
import { Button, Nav } from 'react-bootstrap';
import RestClient from '../../Rest Api/RestClient';
import AppUrl from '../../Rest Api/AppUrl';

const Item = () => {

  const [activeKey, setActiveKey] = useState("1");

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  const Save = () => {

    let id = document.getElementById('id').value;
    let item_name = document.getElementById('item_name').value;
    let description = document.getElementById('description').value;

    let jsonObject = {id : id , item_name: item_name, description: description }

    RestClient.PostRequest(AppUrl.item, JSON.stringify(jsonObject)).then((result => {
      alert(result);
    })).catch((error) => {
      console.log(error);
    })

  }


  // Define content for each nav pills key
  const contentMap = {
    "1": <Pill1 />,
    "2": "Content for Pill 2",
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
                  <div className="float-right">
                    <Button variant="primary" type="submit" onClick={Save}>
                      Send
                    </Button>
                  </div>
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
