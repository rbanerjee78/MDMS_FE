import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRefresh, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import moment from 'moment';

export default function AssetManagement(props) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState('basic');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [assets, setAssets] = useState([]);

  const handleClose = () => {
    setShow(false);
    fetchAssets();
  
  };
  const handleShow = (asset) => {
    setSelectedAsset(asset);
    setShow(true);
  };


 

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };


  const fetchAssets = async () => {
    axios.get('https://localhost:1100/GetAllAssetDetails')
    .then(res => {
      setAssets(res.data.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchAssets();
  }, []);

 
  const handleDeleteAsset = async (id) => {
    console.log('Deleting asset with id:', id);
    const confirmed = window.confirm('Are you sure you want to delete this asset?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch('https://localhost:1100/DeleteAssetDetail', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id.id })
      });
  
      console.log(JSON.stringify({ id: id }))
      if (response.ok) {
        setAssets(assets.filter((asset) => asset.id.id !== id.id));
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  function AssetModal({ asset, show, onHide }) {
    const [updatedAssetData, setUpdatedAssetData] = useState({});

    const [name, setName] = useState(asset.name);
    const [type, setType] = useState(asset.type);
    const [label, setLabel] = useState(asset.label);
    const [assetProfileName, setAssetProfileName] = useState(asset.assetProfileName);
    const [showSuccessToast, setShowSuccessToast] = useState(false); // Add this line to define showSuccessToast state variable


    const updateAsset = async (id, name, type, label, assetProfileName) => {
      try {
          const response = await axios.put('https://localhost:1100/UpdateAssetDetail', {
              id,
              name:name,
              type: type,
              label: label,
              assetProfileName:assetProfileName,
              tenantId: {
                entityType: 'TENANT',
                id: '08fd5e60-c400-11ed-b62c-7d8052ad39cf'
              }
          });
  
          if (response && response.data && response.data.data) {
              console.log(response);
              // Update the state with the new user data
              setUpdatedAssetData({ name: name, type: type, label:label, assetProfileName:assetProfileName });
              
          } else {
              console.error('Unexpected response format:', response.data.data);
              setShowSuccessToast(true);
          }
  
      } catch (error) {
          console.error(error);
      }
  };


    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleTypeChange = (event) => {
      setType(event.target.value);
    };
  
    const handleLabelChange = (event) => {
      setLabel(event.target.value);
    };
  
    const handleAssetProfileChange = (event) => {
      setAssetProfileName(event.target.value);
    };


    return(
      <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton className='bg-violet'>
              <Modal.Title>Asset Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Tabs
                id="controlled-tab-example"
                defaultActiveKey="basic"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                fill
              >
                <Tab eventKey="basic" title="Basic" >
                  <div className="ps-2 pt-2">
                  {showSuccessToast &&
            <div className="alert alert-success" role="alert">Asset updated successfully!</div>
          }
                    <div className='form-group d-grid mb-3'>
                      <label>Meter Name:
                      <input placeholder='Meter Name' className='form-control form-control-sm ' defaultValue={selectedAsset?.name} onChange={handleNameChange} /> 
                       </label>
                    </div>
                    <div className='form-group d-grid mb-3'><label>Meter Type:<input placeholder='Meter Type' className='form-control form-control-sm ' defaultValue={selectedAsset?.type} onChange={handleTypeChange} /></label></div>
                    <div className='form-group d-grid mb-3'><label>Label:<input placeholder="Label"  className='form-control form-control-sm ' defaultValue={selectedAsset?.label} onChange={handleLabelChange}  /></label> </div>
                    <div className='form-group d-grid mb-3'><label>Profile Name: <input placeholder='Profile Name' className='form-control form-control-sm ' defaultValue={selectedAsset?.assetProfileName} onChange={handleAssetProfileChange}  /></label></div>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Attributes">

                </Tab>
                <Tab eventKey="other" title="Other" >

                </Tab>
              </Tabs>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => updateAsset(asset.id, name, type, label, assetProfileName)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
    )
  }



  return (
    <div className="container my-3">
      <div className="main-card py-3 px-3">
        <h5 className="fw-bold">Asset Management</h5>
        <div className="widget-card table-responsive shadow-lg">
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

          <div className='d-flex ms-auto'>

          <Link className='btn btn-primary btn-sm me-3' to="/createasset"><FontAwesomeIcon icon={faPlus}/>Create New</Link>
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

          </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Meter Name</th>
                <th>Meter Type</th>
                <th>Label</th>
                <th>Created Time</th>
                <th>Profile Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                
                <tr key={asset.id.id} >
                  <td><input type="checkbox" 
                  className='checkbox' 
                  checked={selectAll}
                  onChange={() => {}} />
                  
                  </td>
                  <td><Link onClick={() => handleShow(asset)}>{asset.name}</Link></td>
                  <td>{asset.type}</td>
                  <td>{asset.label}</td>
                  <td>{moment(asset.createdTime).format('L')}</td>
                  <td>{asset.assetProfileName}</td>
                  <td>                   <Link onClick={() => handleDeleteAsset(asset.id)}> <FontAwesomeIcon icon={faTrash}  /></Link>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {show && (
        <>
        <AssetModal
            asset={selectedAsset}
            show={show}
            onHide={() => {
              setShow(false);
              fetchAssets();
            }}

          />
          
        </>
      )}
    </div>
  );
}
