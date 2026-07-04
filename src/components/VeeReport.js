import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faDownload, faExclamationTriangle, faCheckCircle, faChartLine, faEllipsisV, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Badge, Button, Row, Col, Card, Pagination } from 'react-bootstrap';
import moment from 'moment';

import axios from 'axios';

export default function VeeReport() {
    const [searchTerm, setSearchTerm] = useState('');
    const [mockVeeData, setMockVeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filterStatus, setFilterStatus] = useState('All');

    const handleExportPDF = () => {
        window.print();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/veeReports`, {
                    headers: { 'X-Authorization': `Bearer ${authToken}` }
                });
                if(response.data && response.data.data) {
                    setMockVeeData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching VEE reports:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getSeverityBadge = (severity) => {
        switch(severity) {
            case 'Critical': return <Badge bg="danger">{severity}</Badge>;
            case 'High': return <Badge bg="warning" text="dark">{severity}</Badge>;
            case 'Medium': return <Badge bg="info">{severity}</Badge>;
            case 'Low': return <Badge bg="secondary">{severity}</Badge>;
            default: return <Badge bg="light" text="dark">{severity}</Badge>;
        }
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Failed': return <Badge bg="danger" pill><FontAwesomeIcon icon={faExclamationTriangle} className="me-1"/> Failed</Badge>;
            case 'Estimated': return <Badge bg="primary" pill><FontAwesomeIcon icon={faChartLine} className="me-1"/> Estimated</Badge>;
            case 'Passed': return <Badge bg="success" pill><FontAwesomeIcon icon={faCheckCircle} className="me-1"/> Passed</Badge>;
            default: return <Badge bg="secondary" pill>{status}</Badge>;
        }
    };

    return (
        <div className='container my-3'>
            <div className="main-card py-3 px-3">
                <PageHeader title="VEE Report" subtitle="Validation, Estimation, and Editing analytics for endpoint data" exportData={mockVeeData} />
                
                {/* Summary Cards */}
                <Row className="mb-4">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3" style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px', letterSpacing: '1px' }}>Total Validations</h6>
                            <h2 className="fw-bold text-dark mb-0">124,502</h2>
                            <small className="text-success fw-bold"><FontAwesomeIcon icon={faChartLine} className="me-1"/>+5.2% Today</small>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3" style={{ background: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px', letterSpacing: '1px' }}>Failed Checks</h6>
                            <h2 className="fw-bold text-danger mb-0">342</h2>
                            <small className="text-danger fw-bold"><FontAwesomeIcon icon={faExclamationTriangle} className="me-1"/>Requires Attention</small>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3" style={{ background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px', letterSpacing: '1px' }}>Auto-Estimated</h6>
                            <h2 className="fw-bold text-primary mb-0">128</h2>
                            <small className="text-primary fw-bold"><FontAwesomeIcon icon={faCheckCircle} className="me-1"/>Successfully Patched</small>
                        </Card>
                    </Col>
                </Row>

                <div className='widget-card table-responsive shadow-lg rounded-4' style={{ minHeight: "50vh", backgroundColor: '#fff' }}>
                    
                    {/* Toolbar */}
                    <div className='d-flex mb-4 align-items-center'>
                        <div className='position-relative me-3' style={{ width: '250px' }}>
                            <FontAwesomeIcon icon={faSearch} className="position-absolute text-muted" style={{ top: '10px', left: '12px' }} />
                            <input 
                                className='form-control form-control-sm rounded-pill ps-5' 
                                placeholder="Search meter or check type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ backgroundColor: '#f8f9fa', border: 'none', padding: '0.4rem 1rem' }}
                            />
                        </div>

                        <Dropdown className='me-2'>
                            <Dropdown.Toggle variant="light" size='sm' className="rounded-pill border-0 shadow-sm text-muted fw-bold">
                                <FontAwesomeIcon icon={faFilter} className="me-2"/>
                                {filterStatus === 'All' ? 'Filter Status' : `Status: ${filterStatus}`}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setFilterStatus('Failed')}>Show Failed</Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterStatus('Estimated')}>Show Estimated</Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterStatus('Passed')}>Show Passed</Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterStatus('All')}>Show All</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <div className='ms-auto'>
                            <Button variant="primary" size="sm" className="rounded-pill px-3 shadow-sm fw-bold" onClick={handleExportPDF}>
                                <FontAwesomeIcon icon={faDownload} className="me-2"/>
                                Export PDF
                            </Button>
                        </div>
                    </div>

                    {/* VEE Data Table */}
                    <table className="table table-hover align-middle">
                        <thead className="table-light text-muted" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <tr>
                                <th className="ps-3 border-0 rounded-start">Log ID</th>
                                <th className="border-0">Meter Name</th>
                                <th className="border-0">Check Type</th>
                                <th className="border-0">Severity</th>
                                <th className="border-0">Recorded Value</th>
                                <th className="border-0">Expected Range</th>
                                <th className="border-0">Timestamp</th>
                                <th className="border-0 text-center">Status</th>
                                <th className="border-0 rounded-end text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '14px' }}>
                            {loading ? (
                                <tr><td colSpan="9" className="text-center py-4"><div className="spinner-border text-primary"></div></td></tr>
                            ) : (() => {
                                const filteredData = mockVeeData.filter(d => {
                                    const matchesSearch = (d.meterName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (d.checkType || '').toLowerCase().includes(searchTerm.toLowerCase());
                                    const matchesFilter = filterStatus === 'All' || d.status === filterStatus;
                                    return matchesSearch && matchesFilter;
                                });
                                const indexOfLastItem = currentPage * itemsPerPage;
                                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                                const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
                                const totalPages = Math.ceil(filteredData.length / itemsPerPage);

                                if (filteredData.length === 0) {
                                    return <tr><td colSpan="9" className="text-center py-4 text-muted">No VEE logs found.</td></tr>;
                                }

                                return currentItems.map((row) => (
                                    <tr key={row.id}>
                                        <td className="ps-3 fw-bold text-secondary">{row.logId}</td>
                                        <td className="fw-bold text-dark">{row.meterName}</td>
                                        <td>{row.checkType}</td>
                                        <td>{getSeverityBadge(row.severity)}</td>
                                        <td className="font-monospace">{row.value}</td>
                                        <td className="font-monospace text-muted">{row.expected}</td>
                                        <td className="text-muted">{moment(row.time).format('MMM Do, h:mm A')}</td>
                                        <td className="text-center">{getStatusBadge(row.status)}</td>
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
                    {!loading && mockVeeData.length > 0 && (() => {
                        const filteredData = mockVeeData.filter(d => {
                            const matchesSearch = (d.meterName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (d.checkType || '').toLowerCase().includes(searchTerm.toLowerCase());
                            const matchesFilter = filterStatus === 'All' || d.status === filterStatus;
                            return matchesSearch && matchesFilter;
                        });
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
