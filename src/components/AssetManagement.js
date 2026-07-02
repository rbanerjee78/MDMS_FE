import PageHeader from './PageHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRefresh, faSearch, faTrash, faCheckCircle, faEllipsisV, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Toast, ToastContainer, Pagination } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchAssets, deleteAsset } from '../redux/actions/assetActions';

function AssetManagement(props) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState('basic');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const { assets } = props;

  const handleClose = () => {
    setShow(false);
    props.fetchAssets();
  };

  const handleShow = (asset) => {
    setSelectedAsset(asset);
    setShow(true);
  };

  useEffect(() => {
    props.fetchAssets();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleDeleteAsset = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this asset?');
    if (!confirmed) {
      return;
    }
    try {
      await props.deleteAsset(id);
      setShowDeleteToast(true);
    } catch (e) {
      console.error(e);
    }
  };

  function AssetModal({ asset, show, onHide }) {
    const [updatedAssetData, setUpdatedAssetData] = useState({});
    const [name, setName] = useState(asset?.name || '');
    const [type, setType] = useState(asset?.type || '');
    const [label, setLabel] = useState(asset?.label || '');
    const [assetProfileName, setAssetProfileName] = useState(asset?.assetProfileName || '');
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const updateAsset = async (id, name, type, label, assetProfileName) => {
      try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/UpdateAssetDetail`, {
          id,
          name: name,
          type: type,
          label: label,
          assetProfileName: assetProfileName,
          tenantId: {
            entityType: 'TENANT',
            id: '08fd5e60-c400-11ed-b62c-7d8052ad39cf'
          }
        });

        if (response && response.data) {
          setUpdatedAssetData({ name, type, label, assetProfileName });
          setShowSuccessToast(true);
        } else {
          setShowSuccessToast(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleNameChange = (event) => setName(event.target.value);
    const handleTypeChange = (event) => setType(event.target.value);
    const handleLabelChange = (event) => setLabel(event.target.value);
    const handleAssetProfileChange = (event) => setAssetProfileName(event.target.value);

    return (
      <Modal show={show} onHide={onHide} size="xl">
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
            <Tab eventKey="basic" title="Basic">
              <div className="ps-2 pt-2">
                {showSuccessToast &&
                  <div className="alert alert-success" role="alert">Asset updated successfully!</div>
                }
                <div className='form-group d-grid mb-3'>
                  <label>Meter Name:
                    <input placeholder='Meter Name' className='form-control form-control-sm ' defaultValue={asset?.name} onChange={handleNameChange} />
                  </label>
                </div>
                <div className='form-group d-grid mb-3'><label>Meter Type:<input placeholder='Meter Type' className='form-control form-control-sm ' defaultValue={asset?.type} onChange={handleTypeChange} /></label></div>
                <div className='form-group d-grid mb-3'><label>Label:<input placeholder="Label" className='form-control form-control-sm ' defaultValue={asset?.label} onChange={handleLabelChange} /></label> </div>
                <div className='form-group d-grid mb-3'><label>Profile Name: <input placeholder='Profile Name' className='form-control form-control-sm ' defaultValue={asset?.assetProfileName} onChange={handleAssetProfileChange} /></label></div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Attributes">
            </Tab>
            <Tab eventKey="other" title="Other">
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
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
        <PageHeader title="Asset Management" subtitle="Manage smart grid assets and physical infrastructure" exportData={props.assets} />
        <div className="widget-card table-responsive shadow-lg">
          <div className='d-flex mb-3 align-items-center'>
            <FontAwesomeIcon icon={faSearch} size="1x" className='me-3 text-muted'></FontAwesomeIcon>
            <div className='form-group me-3'>
              <input 
                className='form-control form-control-sm' 
                placeholder="Search meter name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dropdown className='me-3'>
              <Dropdown.Toggle variant="light" size='sm' id="dropdown-basic">
                Group All
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='me-3'>
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
              <Link className='btn btn-primary btn-sm me-3' to="/createasset"><FontAwesomeIcon icon={faPlus} />Create New</Link>
              <Button variant='light' className='me-3' size='sm' onClick={() => props.fetchAssets()}><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></Button>
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
                <th className="border-0">Meter Name</th>
                <th className="border-0">Meter Type</th>
                <th className="border-0">Label</th>
                <th className="border-0">Created Time</th>
                <th className="border-0">Profile Name</th>
                <th className="border-0 text-center">Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '14px' }}>
              {(() => {
                const filteredData = (assets || []).filter(d => (d.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
                
                if (filteredData.length === 0) {
                    return <tr><td colSpan="7" className="text-center text-muted py-4">No assets found.</td></tr>;
                }

                return currentItems.map(asset => (
                <tr key={asset.id?.id || asset.id}>
                  <td>
                    <input type="checkbox"
                      className='checkbox'
                      checked={selectAll}
                      onChange={() => { }} />
                  </td>
                  <td><Link onClick={() => handleShow(asset)}>{asset.name}</Link></td>
                  <td>{asset.type}</td>
                  <td>{asset.label}</td>
                  <td>{moment(asset.createdTime).format('L')}</td>
                  <td>{asset.assetProfileName}</td>
                  <td className="text-center">
                      <Dropdown align="end">
                          <Dropdown.Toggle variant="light" size="sm" className="btn-icon shadow-sm rounded-circle border-0">
                              <FontAwesomeIcon icon={faEllipsisV} className="text-muted" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="shadow border-0 rounded-3" style={{ fontSize: '14px' }}>
                              <Dropdown.Item onClick={() => handleShow(asset)}><FontAwesomeIcon icon={faEye} className="me-2 text-primary" /> View Details</Dropdown.Item>
                              <Dropdown.Item href="#/action-2"><FontAwesomeIcon icon={faEdit} className="me-2 text-warning" /> Edit</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={() => handleDeleteAsset(asset.id?.id || asset.id)} className="text-danger"><FontAwesomeIcon icon={faTrash} className="me-2" /> Delete</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                  </td>
                </tr>
              ));
              })()}
            </tbody>
          </table>

          {/* Pagination Footer */}
          {(assets && assets.length > 0) && (() => {
              const filteredData = (assets || []).filter(d => (d.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
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

        </div>
      </div>

      {/* Modal */}
      {show && (
        <AssetModal
          asset={selectedAsset}
          show={show}
          onHide={() => {
            setShow(false);
            props.fetchAssets();
          }}
        />
      )}

      {/* Deletion Success Toast */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 10000, position: 'fixed' }}>
        <Toast onClose={() => setShowDeleteToast(false)} show={showDeleteToast} delay={4000} autohide className="border-0 shadow-lg" style={{ borderRadius: '0.5rem' }}>
          <Toast.Header className="bg-success text-white border-0" style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}>
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            <strong className="me-auto">Deleted</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="bg-white" style={{ borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
            The asset has been successfully deleted!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  assets: state.assets.assets,
});

export default connect(mapStateToProps, { fetchAssets, deleteAsset })(AssetManagement);
