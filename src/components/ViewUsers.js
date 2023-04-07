import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faRefresh, faSearch, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';



export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [success, setSuccess] = useState(false);


  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    fetchUsers();
  
  };
  const [key, setKey] = useState('details');
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


  const fetchUsers = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get("https://localhost:1100/api/customers", config);
     // console.log(response);
      setUsers(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error(error.response.status, error.response.data.message);

      //console.error(error);
     // setLoading(false); // Set loading to false on error as well
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
 

  
  

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

  const updateUser = async (id, userCity, userState, userCountry, userTitle, userZip, userAddress) => {
    try {
        const response = await axios.put(`https://localhost:1100/api/customer`, 
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
          animation={false}
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
                <label>Title<input className='form-control form-control-sm ' placeholder='Title' value={userTitle} onChange={handleTitleChange} /></label>
              </div>             
              <div className='form-group  d-grid mb-3'>
                <label>Country<input className='form-control form-control-sm ' placeholder='Country' value={userCountry} onChange={handleCountryChange} /></label>
              </div>
              <div className='form-group  d-grid mb-3'>
                <label>State<input className='form-control form-control-sm ' placeholder='State' value={userState}
                  onChange={handleStateChange} /></label>
              </div>
              <div className='form-group  d-grid mb-3'>
                <label>City<input className='form-control form-control-sm ' placeholder='City' value={userCity}
                  onChange={handleCityChange} /></label>
              </div>
              <div className='form-group  d-grid mb-3'>
                <label>ZipCode<input className='form-control form-control-sm ' placeholder='ZipCode' value={userZip} onChange={handleZipChange} /></label>
              </div>
              <div className='form-group  d-grid mb-3'>
                <label>Address<input className='form-control form-control-sm ' placeholder='Address' value={userAddress} onChange={handleAddressChange} /></label>
              </div>
  
  
            </div>
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => updateUser(user.id, userCity, userState, userCountry, userTitle, userZip, userAddress)}>
  Save Changes
</Button>
      </Modal.Footer>
    </Modal>
  );
  }

  return (
    <div className='container my-3 '>
      <div className=" main-card py-3 px-3">
        <h5 className="fw-bold">View Users</h5>
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
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          }
            <div> {loading && <img src="../../assets/images/spinner.gif" alt="Loading..." />} </div>
            <tbody>
            {/* Show loading gif if loading is true */}
              {users.map((user,index) => (
                <>
              
              
                <tr key={`${user.id}-${index}`}>
                  
                  <td><div className="d-inline-block"><input type="checkbox"
                    className='checkbox'
                    checked={selectAll}
                    onChange={() => { }} /></div></td>
                  <td><Link onClick={() => handleShow(user)}>{user?.title}</Link></td>
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
