import PageHeader from './PageHeader';
import React, {useState, useEffect} from 'react';
import { faSearch, faPlus, faRefresh, faEllipsisV, faEye, faEdit, faTrash, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownButton, Button, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setDevices, setDeviceAsDefault, getDevices } from "../redux/actions/deviceProfilesActions";

const DeviceProfiles = (props) => {

    const { devices, loading, error } = props;
    const [itemsPerPage, setItemsPerPage] = useState(10);   
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const authToken = localStorage.getItem('authToken');
    const [selectAll, setSelectAll] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const dispatch = useDispatch(); 

    const handleSelectAll = () => {
      if (!selectAll) {
        // Select all items currently shown on page
        const filteredData = (props.devices || []).filter(d => (d.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
        setSelectedDevices(currentItems.map(d => d.id.id));
      } else {
        setSelectedDevices([]);
      }
      setSelectAll(!selectAll);
    };

    const handleSelectDevice = (deviceId) => {
      setSelectedDevices(prev => 
        prev.includes(deviceId) ? prev.filter(id => id !== deviceId) : [...prev, deviceId]
      );
    };

    useEffect(() => {
      props.getDevices(authToken); // Dispatch the 'getDevices' action to fetch devices on mount
    }, [dispatch, authToken]);

    const handleSetDefault = async (deviceId) => {
      try {
        await dispatch(setDeviceAsDefault(deviceId, authToken));
        dispatch(getDevices(authToken));
      } catch (error) {
        console.error('Error setting device as default:', error);
      }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    return (
        <div className='container my-3 '>
            <div className=" widget-card py-3 px-3">
                <PageHeader title="Device Profiles" subtitle="Manage device configurations and profiles" exportData={props.devices} />
                <div className='widget-card table-responsive shadow-lg rounded-4 p-3' style={{"minHeight":"50vh", backgroundColor: '#fff'}}>

                    <div className='d-flex mb-3 align-items-center'>
                        <FontAwesomeIcon icon={faSearch} size="1x" className='me-3 text-muted'></FontAwesomeIcon>
                        <div className='form-group me-3'>
                            <input 
                                className='form-control form-control-sm'
                                placeholder='Search profiles...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className='d-flex ms-auto'>
                            <Link className='btn btn-primary btn-sm me-3' to="/createprofile"><FontAwesomeIcon icon={faPlus}/>Create New</Link>
                            <Button variant='light' className='me-3 shadow-sm' size='sm' onClick={() => props.getDevices(authToken)}><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></Button>
                            <DropdownButton id="items-per-page-dropdown" size='sm' title={`Items per page: ${itemsPerPage}`} variant="light" className="shadow-sm">
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

                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light text-muted" style={{ fontSize: '13px', textTransform: 'uppercase' }}>
                            <tr>
                                <th className="border-0" style={{width: '40px'}}>
                                    <input type="checkbox" className='checkbox' checked={selectAll} onChange={handleSelectAll} />
                                </th>
                                <th className="border-0">Profile Name</th>
                                <th className="border-0">Description</th>
                                <th className="border-0">Default</th>
                                <th className="border-0">Created Time</th>
                                <th className="border-0 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '14px' }}>
                            {(() => {
                                const filteredData = (props.devices || []).filter(d => (d.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
                                const indexOfLastItem = currentPage * itemsPerPage;
                                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                                const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

                                if(filteredData.length === 0 && !loading) {
                                    return <tr><td colSpan="7" className="text-center text-muted py-4">No device profiles found.</td></tr>;
                                }

                                return currentItems.map((device, idx) => (
                                    <tr key={idx} className="align-middle">
                                        <td>
                                            <input type="checkbox" className='checkbox' checked={selectedDevices.includes(device.id.id)} onChange={() => handleSelectDevice(device.id.id)} />
                                        </td>
                                        <td className="fw-bold">
                                            <div className="d-flex align-items-center">
                                                <div className="d-flex align-items-center justify-content-center bg-light text-primary rounded-circle me-3" style={{ width: '40px', height: '40px' }}>
                                                    {device.image ? (
                                                        <img src={device.image} alt={device.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faMicrochip} size="lg" />
                                                    )}
                                                </div>
                                                {device.name}
                                            </div>
                                        </td>
                                        <td className="text-muted">{device.description}</td>
                                        <td>
                                            {device.default ? (
                                                <span className='badge bg-success rounded-pill'>Default</span>
                                            ) : (
                                                <button className='btn btn-light shadow-sm border-0 btn-sm rounded-pill' onClick={() => handleSetDefault(device.id.id)}>
                                                    Set As Default
                                                </button>
                                            )}
                                        </td>
                                        <td className="text-secondary">{moment(device.createdTime).format('L')}</td>
                                        <td className="text-center">
                                            <Dropdown align="end">
                                                <Dropdown.Toggle variant="light" size="sm" className="btn-icon shadow-sm rounded-circle border-0">
                                                    <FontAwesomeIcon icon={faEllipsisV} className="text-muted" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="shadow border-0 rounded-3" style={{ fontSize: '14px' }}>
                                                    <Dropdown.Item href="#/action-1"><FontAwesomeIcon icon={faEye} className="me-2 text-primary" /> View Details</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2"><FontAwesomeIcon icon={faEdit} className="me-2 text-warning" /> Edit</Dropdown.Item>
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
                    {(props.devices && props.devices.length > 0) && (() => {
                        const filteredData = (props.devices || []).filter(d => (d.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
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
        </div>
    )
}

const mapStateToProps = (state) => ({
  devices: state.deviceprofiles.devices, 
  loading: state.deviceprofiles.loading, 
  error: state.deviceprofiles.error, 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDevices,
      setDeviceAsDefault,
      getDevices,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DeviceProfiles);
