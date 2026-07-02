import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faWifi, faSignal, faServer, faSearch, faEllipsisV, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card, Badge, Spinner, Dropdown, Pagination } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

export default function CommsData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/commsData`);
                if(response.data && response.data.data) {
                    setData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching Comms data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const offlineNodes = data.filter(d => d.status === 'Offline').length;

    return (
        <div className='container my-3'>
            <div className="main-card py-3 px-3">
                <PageHeader title="Comms & Data" subtitle="Network health metrics, ping times, and gateway connections" exportData={data} />
                
                <Row className="mb-4">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3" style={{ background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px' }}>Network Status</h6>
                            <h2 className="fw-bold text-success mb-0"><FontAwesomeIcon icon={faWifi} className="me-2"/>Optimal</h2>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3" style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px' }}>Offline Nodes</h6>
                            <h2 className="fw-bold text-danger mb-0">{loading ? <Spinner animation="border" size="sm" /> : offlineNodes}</h2>
                        </Card>
                    </Col>
                </Row>

                <div className='widget-card table-responsive shadow-lg rounded-4' style={{ minHeight: "50vh", backgroundColor: '#fff' }}>
                    
                    {/* Toolbar */}
                    <div className='d-flex mb-4 px-3 pt-3 align-items-center'>
                        <div className='position-relative me-3' style={{ width: '250px' }}>
                            <FontAwesomeIcon icon={faSearch} className="position-absolute text-muted" style={{ top: '10px', left: '12px' }} />
                            <input 
                                className='form-control form-control-sm rounded-pill ps-5' 
                                placeholder="Search node ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ backgroundColor: '#f8f9fa', border: 'none', padding: '0.4rem 1rem' }}
                            />
                        </div>
                    </div>

                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light text-muted" style={{ fontSize: '13px', textTransform: 'uppercase' }}>
                            <tr>
                                <th className="ps-3 border-0 rounded-start">Node ID</th>
                                <th className="border-0">Gateway</th>
                                <th className="border-0">Ping Time</th>
                                <th className="border-0">Packet Loss</th>
                                <th className="border-0">Signal Strength</th>
                                <th className="border-0">Last Seen</th>
                                <th className="border-0 text-center">Status</th>
                                <th className="border-0 rounded-end text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '14px' }}>
                            {loading ? (
                                <tr><td colSpan="8" className="text-center py-4"><Spinner animation="border" variant="primary" /></td></tr>
                            ) : (() => {
                                const filteredData = data.filter(d => (d.nodeId || '').toLowerCase().includes(searchTerm.toLowerCase()));
                                const indexOfLastItem = currentPage * itemsPerPage;
                                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                                const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
                                const totalPages = Math.ceil(filteredData.length / itemsPerPage);

                                if (filteredData.length === 0) {
                                    return <tr><td colSpan="8" className="text-center py-4 text-muted">No data found.</td></tr>;
                                }

                                return currentItems.map((row) => (
                                <tr key={row.id}>
                                    <td className="ps-3 fw-bold text-dark"><FontAwesomeIcon icon={faNetworkWired} className="me-2 text-primary"/>{row.nodeId}</td>
                                    <td className="text-secondary"><FontAwesomeIcon icon={faServer} className="me-2 text-muted"/>{row.gateway}</td>
                                    <td className="font-monospace text-secondary">{row.pingTime}</td>
                                    <td className="font-monospace text-secondary">{row.packetLoss}</td>
                                    <td className="font-monospace text-secondary"><FontAwesomeIcon icon={faSignal} className="me-1 text-info"/> {row.signalStrength}</td>
                                    <td className="text-muted">{moment(row.lastSeen).fromNow()}</td>
                                    <td className="text-center">
                                        {row.status === 'Online' ? (
                                            <Badge bg="success" pill>Online</Badge>
                                        ) : (
                                            <Badge bg="danger" pill>Offline</Badge>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <Dropdown align="end">
                                            <Dropdown.Toggle variant="light" size="sm" className="btn-icon shadow-sm rounded-circle border-0">
                                                <FontAwesomeIcon icon={faEllipsisV} className="text-muted" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="shadow border-0 rounded-3" style={{ fontSize: '14px' }}>
                                                <Dropdown.Item href="#/action-1"><FontAwesomeIcon icon={faEye} className="me-2 text-primary" /> View Details</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2"><FontAwesomeIcon icon={faEdit} className="me-2 text-warning" /> Edit Record</Dropdown.Item>
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
                    {!loading && data.length > 0 && (() => {
                        const filteredData = data.filter(d => (d.nodeId || '').toLowerCase().includes(searchTerm.toLowerCase()));
                        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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
