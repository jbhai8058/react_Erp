import React, { Fragment, useEffect, useState } from 'react'
import RestClient from '../../Rest Api/RestClient';
import AppUrl from '../../Rest Api/AppUrl';
import 'select2/dist/css/select2.min.css'; // Import Select2 CSS
import $ from 'jquery'; // Import jQuery
import 'select2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import Item from '../Item/Item';


const Department = () => {

  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleItemAdded = (newItem) => {
    setItems([...items, newItem]);
    // Update the Select2 dropdown
    const $select2 = $('#item');
    const $newOption = $('<option>', {
      value: newItem.item_id,
      text: newItem.item_name,
    });

    // Append the new option to the dropdown
    $select2.append($newOption);

    // Select the newly added option
    $select2.val(newItem.item_id).trigger('change.select2');

    // Close the modal
    setShow(false);
  };

  useEffect(() => {
    // Fetch data from the API
    RestClient.GetRequest(AppUrl.getitems)
      .then((result) => {
        // Assuming result is an array of items
        setItems(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Initialize Select2 in the useEffect hook
    $('#item').select2();

    // Make sure to destroy Select2 when the component unmounts to avoid memory leaks
    return () => {
      $('#item').select2('destroy');
    };
  }, []);

  const btnadd = () => {
    // Get the selected option from the Select2 dropdown
    const Itemid = $('#item').val();
    const selectedItemOption = $('#item option:selected');

    // Get the item ID and item name from the selected option
    const selectedItemValue = selectedItemOption.val();
    const selectedItemText = selectedItemOption.text();

    const godown = $('#department').val();

    // Check if the item is found before proceeding
    if (selectedItemValue && selectedItemText) {
      appendToTable(Itemid, selectedItemText, godown);
      $('#department').val('');
      $('#item').val('').trigger('change.select2')
    }
  }

  // Corrected function name
  const appendToTable = (Itemid, selectedItemValue, godown) => {
    // Assuming you have a table with id 'myTable'
    const tableBody = $('#myTable tbody');

    // Get the current number of rows in the table
    const rowCount = tableBody.find('tr').length + 1;

    // Create a new row
    const newRow = $('<tr>');

    // Append columns to the row
    const column1 = $('<td>').text(rowCount);           // Auto-increment Sr no
    const column2 = $(`<td data-item_id="${Itemid}">`).text(selectedItemValue).addClass('item_name'); // Item ID
    const column3 = $('<td>').text(godown).addClass('department');
    const column4 = $('<td>');
    const column5 = $('<td>');
    // Create a button element
    const button1 = $('<button>').text('Edit').addClass('btn btn-primary edit');
    const button2 = $('<button>').text('Delete').addClass('btn btn-primary delete');

    // Append the button to column4
    column4.append(button1);
    column5.append(button2);

    // Append columns to the row
    newRow.append(column1, column2, column3, column4, column5);

    // Append the row to the table body
    tableBody.append(newRow);

    // Handle double-click on the table row
    newRow.on('dblclick', function (event) {
      // Check if the double-click is on the item name column
      if ($(event.target).hasClass('item_name')) {
        // Replace the text with a Select2 dropdown
        const $item_name = $(event.target);
        const itemId = $item_name.data('item_id');

        // Create a container for Select2 and the plus button
        const $container = $('<div class="select2-container">');

        // Create Select2 dropdown
        const $select = $('<select class="form-control select2">');
        $select.append('<option value="" selected>Select an item</option>');

        items.forEach((item) => {
          $select.append(`<option value="${item.item_id}">${item.item_name}</option>`);
        });

        // Set the initial selected value based on the current item
        $select.val(itemId);

        // Append the Select2 to the container
        $container.append($select);

        // Create the plus button
        const $plusButton = $('<button class="plus-button">+</button>');

        // Append the plus button to the container
        $container.append($plusButton);

        // Replace the text with the container
        $item_name.html($container);

        // Initialize Select2
        $select.select2();

        // Handle change event on the Select2 dropdown
        $select.on('change', function () {
          const selectedItemId = $(this).val();
          // You can handle the change event as needed, e.g., update the data attribute
          $item_name.data('item_id', selectedItemId);
        });

        // Handle click event on the plus button
        $plusButton.on('click', function (event) {
          // Stop the propagation of the click event to prevent it from triggering the double-click event
          event.stopPropagation();

          // Open the modal when the plus button is clicked
          handleShow();

          // Set up a callback function to be executed when the modal data is added
          const modalCallback = (newItem) => {
            // Update the Select2 dropdown
            $item_name.data('item_id', newItem.item_id);
            $item_name.text(newItem.item_name);

            // Close the modal
            handleClose();
          };

          // Pass the callback function to the modal component
          Item({ onItemAdded: modalCallback });
        });
      }
    });

    button1.on('click', function () {
      // Handle edit button click (you can implement your edit logic here)
      console.log('Edit button clicked for row:', rowCount);

      // Populate the form fields with the values from the selected row
      const $row = $(this).closest('tr');
      const itemText = $row.find('.item_name').data('item_id'); // Use .data() method
      const godownText = $row.find('.department').text();

      // Set values in the form fields
      $('#item').val(itemText).trigger('change.select2');
      $('#department').val(godownText);

      // Remove the selected row from the table
      $row.remove();
    });


    button2.on('click', function () {
      // Handle delete button click (you can implement your delete logic here)
      console.log('Delete button clicked for row:', rowCount);
      // Optionally, you can remove the row from the table
      newRow.remove();
    });
  }

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Item onItemAdded={handleItemAdded} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <div className="col-xs-12 col-xm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                  <label htmlFor="item" className="label-with-icon">
                    <span className="label-text">Item</span>
                    <span className="plus-icon">
                      <Button onClick={handleShow}><FontAwesomeIcon icon={faPlus} /></Button>
                    </span>
                  </label>
                  <div className="form-group">
                    <select className='form-control select2' name="item" id="item">
                      <option value="" selected>Select an item</option>
                      {items.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {item.item_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                  <label htmlFor="">Godown</label>
                  <div className="form-group">
                    <input type="text" className='form-control' id='department' />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                  <button id='btnAdd' onClick={btnadd}>+</button>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <table className="table table-bordered" id="myTable">
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Item ID</th>
                        <th>Godown</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Rows will be appended here */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Department;
