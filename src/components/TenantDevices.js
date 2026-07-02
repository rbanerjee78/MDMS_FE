import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faRefresh, faEllipsisV, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton, Button, Modal, Tabs, Tab, ModalFooter, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDevicesRequest,
  fetchDevicesSuccess,
  fetchDevicesFailure,
  assignDevice,
  unassignDevice
} from '../redux/actions/deviceActions';
import { fetchUsers } from '../redux/actions/userActions';
import { exportToCSV } from '../utils/exportUtils';



export default function TenantDevices() {
  const dispatch = useDispatch();
  const { devices, loading } = useSelector((state) => state.devices);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [show, setShow] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);
  const [deviceToUnassign, setDeviceToUnassign] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [key, setKey] = useState('basic');
  const [deviceId, setDeviceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [customersMap, setCustomersMap] = useState({});

    const fetchCustomers = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const headers = { 'X-Authorization': `Bearer ${authToken}`, 'Accept': '*/*' };
        const response = await axios.get('http://localhost:5000/api/customers', { headers });
        const map = {};
        response.data.data.forEach(c => {
          map[c.id.id] = c.title || c.name || c.email;
        });
        setCustomersMap(map);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    const fetchData = async () => {
      dispatch(fetchDevicesRequest());

      try {
        const authToken = localStorage.getItem('authToken');
        const headers = {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${authToken}`,
          'Accept': '*/*',
        };
        const response = await axios.get('http://localhost:5000/api/tenant/devices?pageSize=100&page=0', { headers });
        const data = response.data.data;
        dispatch(fetchDevicesSuccess(data));
      } catch (error) {
        dispatch(fetchDevicesFailure(error.message));
      }
    };

  useEffect(() => {
    fetchData();
    fetchCustomers();
  }, []);

  const handleClick = (device) => {
    setSelectedDevice(device);
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  const handleUnassignClick = (deviceId) => {
    setDeviceToUnassign(deviceId);
    setShowUnassignModal(true);
  }

  const confirmUnassign = () => {
    if (deviceToUnassign) {
      dispatch(unassignDevice(deviceToUnassign))
        .then(() => {
          setShowUnassignModal(false);
          setDeviceToUnassign(null);
          fetchData(); // Refresh list after unassign
        })
        .catch(err => {
          console.error("Failed to unassign", err);
          setShowUnassignModal(false);
        });
    }
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



  function AssignModal({ deviceid, showAssignModal, onHide, onAssignSuccess }) {
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
        const response = await axios.get("http://localhost:5000/api/customers", config);
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
          if (onAssignSuccess) onAssignSuccess();
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
                <option key={user.id.id} value={user.id.id}>{user.title || user.name}</option>
              ))}

            </select> 
            </label></div></div>
          <div className="row"><div className="col-md-6"> <button className="btn btn-primary btn-sm mb-3" onClick={() => handleAssignDevice(selectedCustomerId, deviceid)}>Assign</button></div>
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1" style={{ fontSize: '12px' }}>
                <li className="breadcrumb-item text-muted">Home</li>
                <li className="breadcrumb-item text-dark fw-bold" aria-current="page">Devices</li>
              </ol>
            </nav>
            <h2 className='fw-bold mb-1'><FontAwesomeIcon icon={faSearch} className='me-2' />Tenant Devices</h2>
            <p className="text-muted mb-0" style={{ fontSize: '13px' }}>Manage and assign telemetry endpoints across tenants</p>
          </div>
          <div className="d-flex space-x-3 gap-2">
            <button className="btn btn-light rounded-pill px-4 py-2 shadow-sm border-0" style={{ fontSize: '13px', fontWeight: '500' }} onClick={() => exportToCSV(devices, 'tenant_devices')}>Export report</button>
          </div>
        </div>
        <div className='widget-card table-responsive shadow-lg' style={{ "minHeight": "50vh" }}>




          <div className='d-flex mb-3'>

            <FontAwesomeIcon icon={faSearch} size="1x" className='me-3 pt-2'></FontAwesomeIcon>
            <div className='form-group me-3'>
              <input 
                className='form-control form-control-sm' 
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
              <Link className='btn btn-primary btn-sm me-3' to="/createdevice"><FontAwesomeIcon icon={faPlus} />Create New</Link>
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
                <th className="border-0">Name</th>
                <th className="border-0">Created Time</th>
                <th className="border-0 text-center">Assigned To</th>
                <th className="border-0 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const filteredData = devices.filter(d => (d.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
                
                if (filteredData.length === 0) {
                    return <tr><td colSpan="5" className="text-center text-muted py-4">No devices found.</td></tr>;
                }

                return currentItems.map((device) => (
                <tr key={device.id.id} id={device.id.id}>
                  <td><input type="checkbox"
                    className='checkbox'

                    value={device.id.id} /></td>
                  <td><Link onClick={() => handleClick(device)}>{device.name}</Link></td>
                  <td className="text-muted">{new Date(device.createdTime).toLocaleString()}</td>
                  <td className="text-center">
                    {device.customerId ? (
                      <span className="badge bg-success rounded-pill px-3 py-2" title={`Assigned to ${customersMap[device.customerId] || 'Unknown User'}`}>
                        Assigned: {customersMap[device.customerId] || 'Unknown User'}
                      </span>
                    ) : (
                      <button className="btn btn-light btn-sm shadow-sm border-0 rounded-pill" onClick={() => handleAssignModal(device.id.id)}>
                        Assign Device
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                      <Dropdown align="end">
                          <Dropdown.Toggle variant="light" size="sm" className="btn-icon shadow-sm rounded-circle border-0">
                              <FontAwesomeIcon icon={faEllipsisV} className="text-muted" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="shadow border-0 rounded-3" style={{ fontSize: '14px' }}>
                              <Dropdown.Item onClick={() => handleClick(device)}><FontAwesomeIcon icon={faEye} className="me-2 text-primary" /> View Details</Dropdown.Item>
                              <Dropdown.Item href="#/action-2"><FontAwesomeIcon icon={faEdit} className="me-2 text-warning" /> Edit Record</Dropdown.Item>
                              {device.customerId && (
                                <Dropdown.Item onClick={() => handleUnassignClick(device.id.id)} className="text-warning">
                                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Unassign Device
                                </Dropdown.Item>
                              )}
                              <Dropdown.Divider />
                              <Dropdown.Item href="#/action-3" className="text-danger"><FontAwesomeIcon icon={faTrash} className="me-2" /> Delete</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                  </td>
                </tr>
              ));
              })()}

            </tbody>
          </table>

          {/* Pagination Footer */}
          {!loading && devices.length > 0 && (() => {
              const filteredData = devices.filter(d => (d.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
              const totalPages = Math.ceil(filteredData.length / itemsPerPage);
              if(totalPages === 0) return null;
              
              return (
              <div className="d-flex justify-content-between align-items-center mt-3 px-3 pb-3">
                  <span className="text-muted" style={{ fontSize: '13px' }}>
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                  </span>
                  <Pagination size="sm" className="mb-0">
                      <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                      {[...Array(totalPages)].map((_, i) => (
                          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                              {i + 1}
                          </Pagination.Item>
                      ))}
                      <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                  </Pagination>
              </div>
              );
          })()}

          {showAssignModal && (<AssignModal deviceid={deviceId} showAssignModal={showAssignModal}
            onHide={() => {
              setShowAssignModal(false);
            }}
            onAssignSuccess={() => fetchData()}
          />)}

          {show && (<DeviceModal device={selectedDevice} show={show}
            onHide={() => {
              setShow(false);

            }}
          />)}

          <Modal show={showUnassignModal} onHide={() => setShowUnassignModal(false)} centered>
            <Modal.Header closeButton className="bg-light">
              <Modal.Title className="text-danger"><FontAwesomeIcon icon={faTrash} className="me-2" /> Unassign Device</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4 text-center">
              <p className="mb-0" style={{ fontSize: '16px' }}>Are you sure you want to unassign this device? It will be removed from the customer's account.</p>
            </Modal.Body>
            <Modal.Footer className="border-0 justify-content-center pb-4">
              <Button variant="light" className="px-4 border shadow-sm" onClick={() => setShowUnassignModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" className="px-4 shadow-sm" onClick={confirmUnassign}>
                Yes, Unassign
              </Button>
            </Modal.Footer>
          </Modal>

        </div></div></div>


  )

}
