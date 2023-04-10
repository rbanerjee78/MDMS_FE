import React from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function CustomerDevices() {

   

    const fetchData = async () => {
        const authToken = localStorage.getItem('authToken');
        const headers = {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${authToken}`,
          "Accept": "*/*",
        };
        const response = await axios.get('https://localhost:1100/api/customer/712476e0-ce64-11ed-9b15-dd2dac50548f/devices?pageSize=5&page=0', { headers });
        const data = response.data;
        console.log(data); // do something with the data
      };
      fetchData();


  return (
    <div className='container my-3 '>
            <div className=" main-card py-3 px-3">
                <h5 className="fw-bold"><FontAwesomeIcon icon={faSearch} className='me-2' />Customer Devices</h5>
                <div className='widget-card table-responsive shadow-lg' style={{"minHeight":"50vh"}}>

                    </div></div></div>
  )
}
