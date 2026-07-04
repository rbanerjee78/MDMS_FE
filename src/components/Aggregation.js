import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLayerGroup, faBolt, faExclamationCircle, faEllipsisV, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card, Badge, Spinner, Dropdown, Pagination } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

export default function Aggregation() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/aggregationData`, {
                    headers: { 'X-Authorization': `Bearer ${authToken}` }
                });
                if(response.data && response.data.data) {
                    setData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching Aggregation data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalMeters = data.reduce((acc, curr) => acc + curr.totalMeters, 0);

    return (
        <div className='container my-3'>
            <div className="main-card py-3 px-3">
                <PageHeader title="Aggregation" subtitle="Hierarchical data rollups and grid summaries" exportData={data} />
                
                <Row className="mb-4">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px' }}>Total Active Meters</h6>
                            <h2 className="fw-bold text-dark mb-0">{loading ? <Spinner animation="border" size="sm" /> : totalMeters.toLocaleString()}</h2>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3" style={{ background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px' }}>Total Grid Load</h6>
                            <h2 className="fw-bold text-primary mb-0"><FontAwesomeIcon icon={faBolt} className="me-2"/>3,250 MW</h2>
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
                                placeholder="Search region..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ backgroundColor: '#f8f9fa', border: 'none', padding: '0.4rem 1rem' }}
                            />
                        </div>
                    </div>

                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light text-muted" style={{ fontSize: '13px', textTransform: 'uppercase' }}>
                            <tr>
                                <th className="ps-3 border-0 rounded-start">Region</th>
                                <th className="border-0">Total Meters</th>
                                <th className="border-0">Total Consumption</th>
                                <th className="border-0">Peak Load</th>
                                <th className="border-0 text-center">Active Alerts</th>
                                <th className="border-0 rounded-end text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '14px' }}>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-4"><Spinner animation="border" variant="primary" /></td></tr>
                            ) : (() => {
                                const filteredData = data.filter(d => (d.region || '').toLowerCase().includes(searchTerm.toLowerCase()));
                                const indexOfLastItem = currentPage * itemsPerPage;
                                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                                const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
                                const totalPages = Math.ceil(filteredData.length / itemsPerPage);

                                if (filteredData.length === 0) {
                                    return <tr><td colSpan="6" className="text-center py-4 text-muted">No data found.</td></tr>;
                                }

                                return currentItems.map((row) => (
                                <tr key={row.id}>
                                    <td className="ps-3 fw-bold text-dark"><FontAwesomeIcon icon={faLayerGroup} className="me-2 text-primary"/>{row.region}</td>
                                    <td>{row.totalMeters.toLocaleString()}</td>
                                    <td className="font-monospace text-secondary">{row.totalConsumption}</td>
                                    <td className="font-monospace text-secondary">{row.peakLoad}</td>
                                    <td className="text-center">
                                        {row.activeAlerts > 0 ? (
                                            <Badge bg="danger" pill><FontAwesomeIcon icon={faExclamationCircle} className="me-1"/>{row.activeAlerts}</Badge>
                                        ) : (
                                            <Badge bg="success" pill>0</Badge>
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
                        const filteredData = data.filter(d => (d.region || '').toLowerCase().includes(searchTerm.toLowerCase()));
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
