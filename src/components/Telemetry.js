import PageHeader from './PageHeader';
import { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faRefresh, faEllipsisV, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton, Button, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Telemetry() {
    const [devices, setDevices] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = () => {
      setSelectAll(!selectAll);
    };

    const fetchDevices = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get("http://localhost:5000/api/tenant/devices", {
          headers: { "X-Authorization": `Bearer ${authToken}` }
        });
        setDevices(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch telemetry data:", error);
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchDevices();
    }, []);

    return (
        <div className='container my-3'>
            <div className="main-card py-3 px-3">
                <PageHeader title="Telemetry Data" subtitle="Raw telemetry stream from smart endpoints" exportData={devices} />
                <div className='widget-card table-responsive shadow-lg' style={{ minHeight: "50vh" }}>
                    
                    <div className='d-flex mb-3'>
                        <FontAwesomeIcon icon={faSearch} size="1x" className='me-3 pt-2 text-muted'></FontAwesomeIcon>
                        <div className='form-group me-3'>
                            <input 
                                className='form-control form-control-sm' 
                                placeholder='Search devices...'
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

                        { /*right div*/}
                        <div className='d-flex ms-auto'>
                            <Link className='btn btn-primary btn-sm me-3' to="/createdevice"><FontAwesomeIcon icon={faPlus} />Create New</Link>
                            <Button variant='light' className='me-3' size='sm' onClick={fetchDevices}><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></Button>
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

                    <div className="table-responsive">
                        <table className="table table-striped table-hover position-relative">
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
                                    <th className="border-0">Device Name</th>
                                    <th className="border-0">Description</th>
                                    <th className="border-0">Last Telemetry Update</th>
                                    <th className="border-0 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.length === 0 && !loading && (
                                    <tr><td colSpan="5" className="text-center text-muted py-4">No telemetry streams available.</td></tr>
                                )}
                                {(() => {
                                    const filteredData = devices.filter(d => (d.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
                                    const indexOfLastItem = currentPage * itemsPerPage;
                                    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                                    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
                                    
                                    return currentItems.map(device => (
                                        <tr key={device.id.id}>
                                            <td><input type="checkbox" className="checkbox" checked={selectAll} onChange={() => {}} /></td>
                                            <td className="fw-bold">{device.name}</td>
                                            <td className="text-muted">{device.additionalInfo?.description || 'N/A'}</td>
                                            <td>{new Date(device.createdTime).toLocaleString()}</td>
                                            <td className="text-center">
                                                <Dropdown align="end">
                                                    <Dropdown.Toggle variant="light" size="sm" className="btn-icon shadow-sm rounded-circle border-0">
                                                        <FontAwesomeIcon icon={faEllipsisV} className="text-muted" />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="shadow border-0 rounded-3" style={{ fontSize: '14px' }}>
                                                        <Dropdown.Item href="#/action-1"><FontAwesomeIcon icon={faEye} className="me-2 text-primary" /> View Stream</Dropdown.Item>
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
                    </div>

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
                </div>
            </div>
        </div>
    );
}
