import React, { Fragment, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import AppUrl from '../../Rest Api/AppUrl';
import RestClient from '../../Rest Api/RestClient';

const Department = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  }

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  }

  const handleClick = () => {
    if (editingIndex === -1) {
      setTableData([...tableData, { firstname, lastname }]);
    } else {
      // If editing, update the existing data
      const updatedTableData = [...tableData];
      updatedTableData[editingIndex] = { firstname, lastname };
      setTableData(updatedTableData);
      setEditingIndex(-1); // Reset the editing index
    }
    setFirstname('');
    setLastname('');
  }

  const handleEdit = (index) => {
    const itemToEdit = tableData[index];
    setFirstname(itemToEdit.firstname);
    setLastname(itemToEdit.lastname);
    setEditingIndex(index);
    setTableData([]);
  }

  const handleDelete = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
    setEditingIndex(-1); // Exit edit mode if in edit mode
  }

  const Save = () => {

    let dept_id = document.getElementsByClassName('dept_id')[0].textContent;
    let dept_name = document.getElementsByClassName('dept_name')[0].textContent;
    let dept_address = document.getElementsByClassName('dept_address')[0].textContent;

    let jsonObject = { dept_id: dept_id, dept_name: dept_name, dept_address: dept_address }

    RestClient.PostRequest(AppUrl.savedepartment, JSON.stringify(jsonObject)).then((result => {
      alert(result);
    })).catch((error) => {
      console.log(error);
    })

  }


  return (
    <Fragment>
      <div>
        <input type="text" value={firstname} onChange={handleFirstnameChange} />
        <input type="text" value={lastname} onChange={handleLastnameChange} />
        <button onClick={handleClick}>{editingIndex === -1 ? 'Add to Table' : 'Save'}</button>

        <Table striped responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id='tabledata'>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className='dept_id'>{index + 1}</td>
                <td className='dept_name'>{item.firstname}</td>
                <td className='dept_address'>{item.lastname}</td>
                <td><Button onClick={() => handleEdit(index)}>Edit</Button>  <Button onClick={() => handleDelete(index)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" type="submit" onClick={Save}>
          Send
        </Button>
      </div>
    </Fragment>
  )
}

export default Department;
