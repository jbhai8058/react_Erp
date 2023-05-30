import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'

const Dashboard = () => {

  const [asidebarData, setAsidebarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/asidebar/1');
        setAsidebarData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>

<div className='text-center'>
      {/* Render the asidebarData in your component if it is an array */}
      {
        asidebarData.map(item => (
          console.log(item),
          <div key={item.id}>
            <h2>{item.vr_title}</h2>
            {/* Render other properties as needed */}
          </div>
        ))}
    </div>
    </Fragment>
  )
}

export default Dashboard
