import { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton, Button, Modal, Tabs, Tab } from 'react-bootstrap';
import { Link } from "react-router-dom";



export default function TenantDevices() {

  const [devices, setDevices] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [key, setKey] = useState('basic');




  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${authToken}`,
        'Accept': '*/*',
      };
      const response = await axios.get('https://localhost:1100/api/tenant/devices?pageSize=5&page=0', { headers });
      const data = response.data.data;
      setDevices(response.data.data)
      //console.log(data); // do something with the data
      setLoading(false);
    };
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once, after the initial render.

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };


  const handleClick = (device) => {
    setSelectedDevice(device);
    console.log(device)
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }


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
              <tr><td style={{wordBreak:''}}><p>{device.additionalInfo.description}</p></td><td>{device.deviceData.configuration.type}</td></tr>
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


  return (
    <div className='container my-3 '>
      <div className=" main-card py-3 px-3">
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



          <table className="table table-striped table-hover position-relative">
            <thead>
              <tr>
                <th> <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                /></th>
                <th>Name</th>
               
                <th>Created Time</th>
              </tr>
            </thead>
            <tbody>

              {loading && <div className="d-flex justify-content-center mt-4"><div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div></div>}


              {devices.map((device) => (
                <tr key={device.id.id}>
                  <td><input type="checkbox"
                    className='checkbox'
                    checked={selectAll}
                    onChange={() => { }} /></td>
                  <td><Link onClick={() => handleClick(device)}>{device.name}</Link></td>                 
                  <td>{new Date(device.createdTime).toLocaleString()}</td>
                </tr>
              ))}


            </tbody>
          </table>
          {show && (<DeviceModal device={selectedDevice} show={show}
            onHide={() => {
              setShow(false);

            }}
          />)}
        </div></div></div>


  )

}
