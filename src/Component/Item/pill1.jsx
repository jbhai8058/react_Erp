import React, { Fragment, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import RestClient from '../../Rest Api/RestClient';
import AppUrl from '../../Rest Api/AppUrl';
import { useState } from 'react';

const Pill1 = () => {

  const [id, setid] = useState();

  useEffect(() => {
    // Fetch the maximum ID when the component mounts
    getmaxid()
  }, []);

  const getmaxid = () => {

    let id = document.getElementById('id').value;

    let jsonObject = { id: id }

    RestClient.PostRequest(AppUrl.getmaxid, JSON.stringify(jsonObject)).then((result => {
      setid(result)
      console.log(result)
    })).catch((error) => {
      console.log(error);
    })

  }

  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Label>Id</Form.Label>
          <Form.Control id='id' onChange={id} type="number" placeholder="Id" />
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
