import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus, faPlus, faRefresh, faSearch, faUserGroup, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';



export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [success, setSuccess] = useState(false);
  const [devices, setDevices] = useState([]);
  const [userById, setUserById] = useState([]);


  const handleShow = (user) => {
    setSelectedUser(user.id);
    setShow(true);
    fetchDevices(user.id)
    fetchUserById(user.id)
  };
  const handleClose = () => {
    setShow(false);
    fetchUsers();
  
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

const authToken = localStorage.getItem('authToken');

const config = {
  headers: {    
    Accept:'*/*',
    'X-Authorization':`Bearer ${authToken}`    
  },
  params: {
    pageSize: 10,
    page: 0,
  },

};

const deviceconfig = {
  headers: {    
    Accept:'*/*',
    'X-Authorization':`Bearer ${authToken}`    
  },
  params: {
    pageSize: 5,
    page: 0,
  },

};

const fetchDevices = useCallback(async (userId) => {
  setLoading(true); // Set loading to true before fetching data
  try {
    const response = await axios.get(`https://localhost:1100/api/customer/${userId}/devices`, deviceconfig);
    setDevices(response.data.data);
    console.log(response.data.data);
    setLoading(false); // Set loading to false after fetching data
  } catch (error) {
   // console.error(error.response.status, error.response.data.message);
    setLoading(false); // Set loading to false on error as well
  }
}, []);



const fetchUserById = useCallback(async (userId) => {
  //setLoading(true); // Set loading to true before fetching data
  try {
    const response = await axios.get(`https://localhost:1100/api/customer/${userId}`, config);
    setUserById(response.data);
    //console.log(response.data);
   // setLoading(false); // Set loading to false after fetching data
  } catch (error) {
    console.error(error.response.status, error.response.data.message);
   // setLoading(false); // Set loading to false on error as well
  }
}, []);



const fetchUsers = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get("https://localhost:1100/api/customers", config);
     // console.log(response);
      setUsers(response.data.data);
     // setTotalPages(response.data.totalPages);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error(error.response.status, error.response.data.message);

      //console.error(error);
     // setLoading(false); // Set loading to false on error as well
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
 

  
  

    const handleDeleteUser = async (id) => {
      console.log('Deleting user with id:', id);
      const confirmed = window.confirm('Are you sure you want to delete this user?');
      if (!confirmed) {
        return;
      }
      try {
        const response = await fetch(`https://localhost:1100/api/customer/${id.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization':`Bearer ${authToken}`
          },
          body: JSON.stringify({ id: id.id })
         
        });

      
         
        if (response.ok) {
          setUsers(users.filter((user) => user.id.id !== id.id));
          console.log('user deleted successfully');
          setSuccess(true);
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    
    
    
    
    
    
    
    

  //const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //const startIndex = currentPage * itemsPerPage;
  // const usersToDisplay = users.slice(startIndex, startIndex + itemsPerPage);
 
  function UserModal({ user, show, onHide }) {
  const [showSuccessToast, setShowSuccessToast] = useState(false); // Add this line to define showSuccessToast state variable
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [userCity, setUserCity] = useState(user.city);
  const [userCountry, setUserCountry] = useState(user.country);
  const [userState, setUserState] = useState(user.state);
  const [userTitle, setUserTitle] = useState(user.title);
  const [userZip, setUserZip] = useState(user.zip);
  const [userAddress, setUserAddress] = useState(user.address);
  const [key, setKey] = useState('details');
  const [successdevice, setsuccessdevice] = useState(false);

  const updateUser = async (id, userCity, userState, userCountry, userTitle, userZip, userAddress) => {
    try {
        const response = await axios.put(`https://localhost:1100/api/customer/`, 
        {
            id,
            title:userTitle,
            city: userCity,
            state: userState,
            country:userCountry,
            zip:userZip,
            address:userAddress,
            tenantId: {
              entityType: 'TENANT',
              id: '08fd5e60-c400-11ed-b62c-7d8052ad39cf'
            }
        });

        if (response && response.data && response.data.data) {
            console.log(response);
            // Update the state with the new user data
            setUpdatedUserData({ city: userCity, state: userState, title:userTitle, country:userCountry, zip:userZip, address:userAddress });
            
        } else {
            console.error('Unexpected response format:', response.data.data);
            setShowSuccessToast(true);
        }

    } catch (error) {
        console.error(error);
    }
};

  

  const handleCityChange = (event) => {
    setUserCity(event.target.value);
  };

  const handleTitleChange = (event) => {
    setUserTitle(event.target.value);
  };

  const handleStateChange = (event) => {
    setUserState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setUserCountry(event.target.value);
  };

  const handleZipChange = (event) => {
    setUserZip(event.target.value);
  };

  const handleAddressChange = (event) => {
    setUserAddress(event.target.value);
  };


  const handleUnassign = async (event, deviceid) =>{
    event.preventDefault(); 
    const headers = {
      'X-Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };

     await fetch(`https://localhost:1100/api/customer/device/${deviceid}/`, {
      method: 'DELETE',
      headers: headers
    })
    .then(response => {
      if (response.ok) {
        //alert('Device unassigned successfully.');
        setsuccessdevice(true);
        setTimeout(() => {
          
          handleClose();
        }, 2000);

      } else {
        throw new Error('Failed to unassign device.');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Failed to unassign device.');
    });
  }


  //devices list code

 
  

  return (
    <Modal show={show} onHide={handleClose} size="xl" animation={false}>
      <Modal.Header closeButton className='bg-violet'>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  
        <Tabs
          id="controlled-tab-example"
          defaultActiveKey="details"
          activeKey={key}
         
          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
        >
          <Tab eventKey="details" title="Details" >
            <div className=" ps-2 pt-2 ">
            {success &&
            <div className="alert alert-success" role="alert">User updated successfully!</div>
          }
              <div className='form-group d-grid mb-3'>
                <label>Title<input className='form-control form-control-sm ' placeholder='Title' defaultValue={userById.title} onChange={handleTitleChange} /></label>
              </div>             
              <div className='form-group  d-grid mb-3'>
                <label>Country<input className='form-control form-control-sm ' placeholder='Country' defaultValue={userById.country} onChange={handleCountryChange} /></label>
              </div>
              <div className='form-group  d-grid mb-3'>
                <label>State<input className='form-control form-control-sm ' placeholder='State' defaultValue={userById.state}
                  onChange={handleStateChange} /></label>
              </div>
              <div className='form-group  d-grid mb-3'>
                <label>City<input className='form-control form-control-sm ' placeholder='City' defaultValue={userById.city}
                  onChange={handleCityChange} /></label>
              </div>
              <div className='form-group  d-grid mb-3'>
                <label>ZipCode<input className='form-control form-control-sm ' placeholder='ZipCode' defaultValue={userById.zip} onChange={handleZipChange} /></label>
              </div>
              <div className='form-group  d-grid mb-3'>
                <label>Address<input className='form-control form-control-sm ' placeholder='Address' defaultValue={userById.address} onChange={handleAddressChange} /></label>
              </div>
  
  
            </div>
          </Tab>
          <Tab eventKey="devices" title="Devices" >
          {successdevice &&
            <div className="alert alert-success" role="alert">Device updated successfully!</div>
          }
          <table className="table table-striped table-hover"> 
          <thead><tr><th>Device Name:</th><th>Description:</th><th>Unassign</th></tr></thead>
          <tbody>
          {devices.map((device) => (
             <>
          <tr key={device.id.id} id={device.id.id}><td>{device.name}</td><td>{device.additionalInfo?.description}</td><td>
            
            <Link onClick={(event) => handleUnassign(event, device.id.id)} className='btn btn-danger btn-sm'>Unassign</Link></td></tr>
</> 
))}  
</tbody>
      </table> 
  
  </Tab>
          <Tab eventKey="profile" title="Attributes">
  
          </Tab>
          <Tab eventKey="other" title="Latest Telemetry" >
  
          </Tab>
          <Tab eventKey="alarms" title="Alarms" >
  
          </Tab>
          <Tab eventKey="events" title="Events" >
  
          </Tab>
        </Tabs>
  
  
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className='btn-sm' onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary"  className='btn-sm' onClick={() => updateUser(user.id, userCity, userState, userCountry, userTitle, userZip, userAddress)}>
  Save Changes
</Button>
      </Modal.Footer>
    </Modal>
  );
  }

  return (
    <div className='container my-3 '>
      <div className=" main-card py-3 px-3">
        <h5 className="fw-bold"><FontAwesomeIcon icon={faUserGroup} className='me-2'/>View Users</h5>
        <div className='widget-card shadow-lg mb-4'>
        
          <div className='d-flex'>

            <FontAwesomeIcon icon={faSearch} size="1x" className='me-3 pt-2'></FontAwesomeIcon>
            <div className='form-group me-3'>
              <input className='form-control form-control-sm'></input>
            </div>
            <Dropdown className='me-3' >

              <Dropdown.Toggle variant="light" size='sm' id="dropdown-basic"  >
                Group All
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className='me-3' >
              <Dropdown.Toggle variant="light" size='sm' id="dropdown-basic">
                Last Usage Time
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            { /*right div*/}
            <div className='d-flex ms-auto'>
              <Link className='btn btn-primary btn-sm me-3' to="/createuser"><FontAwesomeIcon icon={faPlus}/>Create New</Link>
              <Button variant='light' className='me-3' size='sm'><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></Button>
              <Dropdown className='me-3'>
                <Dropdown.Toggle variant="light" size='sm' id="dropdown-basic">
                  Actions(5)
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <DropdownButton id="items-per-page-dropdown" size='sm' title={`Items per page: ${itemsPerPage}`} variant="light">
                <Dropdown.Item onClick={() => setItemsPerPage(5)}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => setItemsPerPage(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => setItemsPerPage(20)}>20</Dropdown.Item>
                <Dropdown.Item onClick={() => setItemsPerPage(50)}>50</Dropdown.Item>
              </DropdownButton>


            </div>
          </div>

          <div className='border-bottom pb-3'></div>

          <div> {loading && <div className="d-flex justify-content-center mt-4"><div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div></div>} </div>


          <table className="table table-striped table-hover position-relative">
            <thead>
              <tr>
                <th> <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                /></th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Role</th>
                <td>Created Time</td>
                <th>Groups</th>
                <th className='text-center'>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            {success &&
            <div className="alert alert-success position-absolute top-0 start-50 translate-middle alert-dismissible" role="alert">User updated successfully!
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          }
          
            <tbody>
          
              {users.map((user) => (
                <>
              
              
                <tr key={user.id.id} id={user.id.id}>
                  
                  <td><div className="d-inline-block"><input type="checkbox"
                    className='checkbox'
                    checked={selectAll}
                    onChange={() => { }} /></div></td>
                  <td><Link onClick={() => handleShow(user.id)}>{user?.title}</Link></td>
                  <td>{user?.email}</td>
                  <td>{user?.id.entityType}</td>
                 <td>{moment(user.createdTime).format('L')}</td> 
                  <td>{user?.tenantId?.entityType}</td>
                  <td className='text-center'>
                    <span><FontAwesomeIcon icon={faCheck} /></span>
                  </td>
                  <td>
                   <Link onClick={() => handleDeleteUser(user.id)}> <FontAwesomeIcon icon={faUserMinus}  /></Link>
                  </td>
                </tr>
                </>
              ))}


            </tbody>
          </table>




        </div>
      </div>

      {show && (
        <>
          <UserModal
            user={selectedUser}
            device={devices}
            show={show}
            onHide={() => {
              setShow(false);
              fetchUsers();
            }}

          />
        </>
      )}

    </div>
  );
}
