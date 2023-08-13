import React, { Fragment, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import RestClient from '../../Rest Api/RestClient';
import AppUrl from '../../Rest Api/AppUrl';
import { useState } from 'react';

const Pill1 = () => {

  const [id, setid] = useState();

  useEffect(() => {
    // Fetch the maximum ID when the component mounts
    getmaxid();
    const element = document.getElementById('id');
    if (element) {
      element.addEventListener('change', fetchitem);
    }
  }, []);

  const handleChange = (event) => {
    setid(event.target.value);
  };

  const getmaxid = () => {

    let id = document.getElementById('id').value;

    let jsonObject = { id: id }

    RestClient.PostRequest(AppUrl.getmaxid, JSON.stringify(jsonObject)).then((result => {
      setid(result)
    })).catch((error) => {
      console.log(error);
    })

  }

  const fetchitem = () => {

    let id = document.getElementById('id').value;

    let jsonObject = { id: id }

    RestClient.PostRequest(AppUrl.fetchitem, JSON.stringify(jsonObject)).then((result => {

      if (result == false) {
        alert('not found');
      } else {
        populatedata(result);
      }
    })).catch((error) => {
      console.log(error);
    })

  }

  const populatedata = (data) => {
    if (data && data.length > 0) {
      document.getElementById('id').value = data[0]['item_id'];
      document.getElementById('item_name').value = data[0]['item_name'];
      document.getElementById('description').value = data[0]['description'];
    } else {
      document.getElementById('id').value = '';
      document.getElementById('item_name').value = '';
      document.getElementById('description').value = '';
    }
  };


  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Label>Id</Form.Label>
          <Form.Control id='id' value={id} onChange={handleChange} type="number" placeholder="Id" />
        </Form.Group> <br />
        <Form.Group>
          <Form.Label>Item Name</Form.Label>
          <Form.Control id='item_name' type="text" placeholder="Item Name" />
        </Form.Group> <br />
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control id='description' as='textarea' rows={3} placeholder="Item Description" />
        </Form.Group> <br />
      </Form>
    </Fragment>
  )
}

export default Pill1