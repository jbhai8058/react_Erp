import React, { Fragment, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import RestClient from '../../Rest Api/RestClient';
import AppUrl from '../../Rest Api/AppUrl';
import { useState } from 'react';

const Pill1 = () => {
  const [inputId, setInputId] = useState(''); // User input
  const [id, setId] = useState('');
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = (event) => {
    setInputId(event.target.value);
  };

  useEffect(() => {
    fetchitem();
    getmaxid();
  }, []);

  const fetchitem = () => {
    let jsonObject = { id: inputId };

    RestClient.PostRequest(AppUrl.fetchitem, JSON.stringify(jsonObject))
      .then((result) => {
        console.log(result);
        if (result && result.length > 0) {
          const data = result[0];
          setId(data.id);
          setItemName(data.item_name);
          setDescription(data.description);
        } else {
          setId('');
          setItemName('');
          setDescription('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const getmaxid = () => {

    let jsonObject = { id: inputId  }

    RestClient.PostRequest(AppUrl.getmaxid, JSON.stringify(jsonObject)).then((result => {
      setId(result);
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
          <Form.Control
            value={inputId}
            onChange={handleChange}
            type="number"
            placeholder="Id"
          />
        </Form.Group> <br />
        <Form.Group>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            value={itemName}
            type="text"
            placeholder="Item Name"
          />
        </Form.Group> <br />
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            as='textarea'
            rows={3}
            placeholder="Item Description"
          />
        </Form.Group>
      </Form>
    </Fragment>
  )
}

export default Pill1;
