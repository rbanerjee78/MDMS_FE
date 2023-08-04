import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton, Button, Modal, Tabs, Tab, ModalFooter } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDevicesRequest,
  fetchDevicesSuccess,
  fetchDevicesFailure,
  assignDevice
} from '../redux/actions/deviceActions'; 
import { fetchUsers } from '../redux/actions/userActions';



export default function TenantDevices() {
  const dispatch = useDispatch();
  const { devices, loading } = useSelector((state) => state.devices);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [show, setShow] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [key, setKey] = useState('basic');
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDevicesRequest());

      try {
        const authToken = localStorage.getItem('authToken');
        const headers = {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${authToken}`,
          'Accept': '*/*',
        };
        const response = await axios.get('https://localhost:1100/api/tenant/devices?pageSize=5&page=0', { headers });
        const data = response.data.data;
        dispatch(fetchDevicesSuccess(data));
      } catch (error) {
        dispatch(fetchDevicesFailure(error.message));
      }
    };

    fetchData();
  }, []);

  const handleClick = (device) => {
    setSelectedDevice(device);
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);

  }


  const handleAssignModal = (id) => {
    setShowAssignModal(true);
    setDeviceId(id);

  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
  };




  function DeviceModal({ device, show, onHide }) {

    return (<Modal show={show} device={selectedDevice} onHide={handleClose} size="xl" animation={false}>

      <Modal.Header closeButton className='bg-violet'>
        <Modal.Title>Tenant Devices Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs
          id="controlled-tab-example"
          defaultActiveKey="info"
          activeKey={key}

          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
          animation={false}
        >
          <Tab eventKey='basic' title='Basic Info'>
            <table className="table table-striped table-hover">
              <thead><tr><th>Device Name</th></tr></thead>
              <tbody>
                <tr> <td>{device.name}</td></tr>
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="info" title="Additional Info" >
            <table className="table table-striped table-hover ">
              <thead><tr><th>Device Description</th><th>Device Configuration</th></tr></thead>
              <tbody>
                <tr><td style={{ wordBreak: '' }}><p>{device.additionalInfo.description}</p></td><td>{device.deviceData.configuration.type}</td></tr>
              </tbody>
            </table>

          </Tab>
        </Tabs>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Body>

    </Modal>);
  }



  function AssignModal({ deviceid, showAssignModal, onHide }) {
    const [users, setUsers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(users.length > 0 ? users[0].id : '');
    const [success, setSuccess] = useState(false);


    const authToken = localStorage.getItem('authToken');

    const config = {
      headers: {
        "Accept": "*/*",
        "X-Authorization": `Bearer ${authToken}`
      },
      params: {
        pageSize: 10,
        page: 0,
      },

    };

    const fetchUsers = useCallback(async () => {
      try {
        const response = await axios.get("https://localhost:1100/api/customers", config);
       console.log(response);
        setUsers(response.data.data);       
      } catch (error) {
        console.error(error.response.status, error.response.data.message);  
      }
    }, []);

    useEffect(() => {
      fetchUsers();
    }, [fetchUsers]);

   
    
    const handleAssignDevice = (customerId, deviceId) => {
      dispatch(assignDevice(customerId, deviceId))
        .then((data) => {
          setSuccess(true);
        })
        .catch((error) => {
          console.error(error);
        });
    };

   // console.log(users)
    return (
      <Modal size="xl" show={showAssignModal} onHide={handleCloseAssignModal} deviceid={deviceId} animation={false}>
        <Modal.Header closeButton className="bg-violet">
          <Modal.Title>Assign Device To Customer</Modal.Title>
        </Modal.Header>



        <Modal.Body className="border rounded border-secondary mx-3 my-3 px-3 py-3">
        {success &&
            <div className="alert alert-success" role="alert">Device assigned successfully!</div>
          }
          <div className="row"><div className="form-group col-md-6"><label className="d-flex flex-column">Device<input disabled type="text" className="form-control-sm mb-3" value={deviceid} /></label></div></div>

          <div className="row"><div className="form-group  col-md-6">
            <label className="d-flex flex-column">Select Customer
            <select className="form-select form-select-sm mb-3" defaultValue={selectedCustomerId} onChange={(event) => setSelectedCustomerId(event.target.value)}>
              {users.map(user => (
                <option key={user.id.id} value={user.id.id}>{user.name}</option>
              ))}

            </select> 
            </label></div></div>
          <div className="row"><div className="col-md-6"> <button className="btn btn-primary btn-sm mb-3" onClick={handleAssignDevice}>Assign</button></div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAssignModal}>
            Close
          </Button>
        </Modal.Footer>


      </Modal>
    );
  }


  return (

    <div className='container my-3 '>
      <div className=" widget-card py-3 px-3">
        <h5 className="fw-bold"><FontAwesomeIcon icon={faSearch} className='me-2' />Tenant Devices</h5>
        <div className='widget-card table-responsive shadow-lg' style={{ "minHeight": "50vh" }}>




          <div className='d-flex mb-3'>

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




            { /*right div*/}
            <div className='d-flex ms-auto'>
              <Link className='btn btn-primary btn-sm me-3' ><FontAwesomeIcon icon={faPlus} />Create New</Link>
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

          {loading && <div className="d-flex justify-content-center mt-4"><div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div></div>}

          <table className="table table-striped table-hover position-relative">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Created Time</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>




              {devices.map((device) => (
                <tr key={device.id.id} id={device.id.id}>
                  <td><input type="checkbox"
                    className='checkbox'

                    value={device.id.id} /></td>
                  <td><Link onClick={() => handleClick(device)}>{device.name}</Link></td>
                  <td>{new Date(device.createdTime).toLocaleString()}</td>
                  <td><button className="btn btn-light btn-sm border-secondary" onClick={() => handleAssignModal(device.id.id)}>
                    Assign Device
                  </button>
                  </td>
                </tr>
              ))}


            </tbody>
          </table>

          {showAssignModal && (<AssignModal deviceid={deviceId} showAssignModal={showAssignModal}
            onHide={() => {
              setShowAssignModal(false);

            }}
          />)}

          {show && (<DeviceModal device={selectedDevice} show={show}
            onHide={() => {
              setShow(false);

            }}


          />)}







        </div></div></div>


  )

}
