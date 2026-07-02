import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import ReactEcharts from "echarts-for-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faExclamationCircle, faExclamationTriangle, faCheckCircle, faBolt, faWifi, faShieldAlt, faMicrochip, faEllipsisV, faEye, faCheck, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card, Badge, Dropdown, Pagination } from 'react-bootstrap';
import moment from 'moment';

const MOCK_EVENTS = [
    { id: 'EVT-8021', type: 'Power Failure', severity: 'Critical', source: 'Meter-0042 (Sector 7)', status: 'Active', time: moment().subtract(1, 'hours').toISOString(), desc: 'Complete power loss reported by endpoint.' },
    { id: 'EVT-8022', type: 'Tamper Alert', severity: 'Critical', source: 'Meter-1193 (Sector 2)', status: 'Active', time: moment().subtract(3, 'hours').toISOString(), desc: 'Cover removal detected.' },
    { id: 'EVT-8023', type: 'Comm Loss', severity: 'Warning', source: 'Gateway-North', status: 'Resolved', time: moment().subtract(12, 'hours').toISOString(), desc: 'Failed to ping gateway for 15 minutes.' },
    { id: 'EVT-8024', type: 'Voltage Drop', severity: 'Warning', source: 'Meter-0991 (Sector 4)', status: 'Active', time: moment().subtract(1, 'days').toISOString(), desc: 'Voltage sag below 200V.' },
    { id: 'EVT-8025', type: 'Firmware Update', severity: 'Info', source: 'Substation Alpha', status: 'Resolved', time: moment().subtract(2, 'days').toISOString(), desc: 'Routine OTA firmware update completed.' },
    { id: 'EVT-8026', type: 'High Temp', severity: 'Warning', source: 'Transformer T-88', status: 'Active', time: moment().subtract(3, 'days').toISOString(), desc: 'Operating temperature exceeding threshold.' },
    { id: 'EVT-8027', type: 'Power Failure', severity: 'Critical', source: 'Meter-0012 (Sector 9)', status: 'Resolved', time: moment().subtract(4, 'days').toISOString(), desc: 'Phase imbalance caused trip.' },
    { id: 'EVT-8028', type: 'Tamper Alert', severity: 'Critical', source: 'Meter-3311 (Sector 1)', status: 'Resolved', time: moment().subtract(5, 'days').toISOString(), desc: 'Magnetic interference detected.' },
    { id: 'EVT-8029', type: 'Comm Loss', severity: 'Warning', source: 'Gateway-South', status: 'Resolved', time: moment().subtract(6, 'days').toISOString(), desc: 'Network timeout.' },
    { id: 'EVT-8030', type: 'Config Change', severity: 'Info', source: 'System', status: 'Resolved', time: moment().subtract(7, 'days').toISOString(), desc: 'Admin updated threshold profiles.' },
];

export default function EventDashboard() {
    const [events, setEvents] = useState(MOCK_EVENTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSeverity, setFilterSeverity] = useState('All');
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Charts configuration
    const donutChartOption = {
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        color: ['#dc3545', '#ffc107', '#0dcaf0', '#0d6efd', '#6c757d'],
        series: [
            {
                name: 'Event Types',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: { show: false, position: 'center' },
                emphasis: {
                    label: { show: true, fontSize: 16, fontWeight: 'bold' }
                },
                labelLine: { show: false },
                data: [
                    { value: 450, name: 'Power Failure' },
                    { value: 120, name: 'Tamper Alert' },
                    { value: 890, name: 'Comm Loss' },
                    { value: 230, name: 'Firmware Update' },
                    { value: 150, name: 'Misc/Other' }
                ]
            }
        ]
    };

    const barChartOption = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: { alignWithLabel: true }
            }
        ],
        yAxis: [
            { type: 'value' }
        ],
        series: [
            {
                name: 'Events Logged',
                type: 'bar',
                barWidth: '60%',
                data: [120, 200, 150, 80, 70, 110, 130],
                itemStyle: {
                    color: '#6366f1',
                    borderRadius: [4, 4, 0, 0]
                }
            }
        ]
    };

    // Filter Logic
    const filteredEvents = events.filter(evt => {
        const matchesSearch = (evt.source.toLowerCase().includes(searchTerm.toLowerCase()) || evt.type.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesSeverity = filterSeverity === 'All' || evt.severity === filterSeverity;
        return matchesSearch && matchesSeverity;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

    const getSeverityBadge = (severity) => {
        switch(severity) {
            case 'Critical': return <Badge bg="danger" pill><FontAwesomeIcon icon={faExclamationCircle} className="me-1"/> Critical</Badge>;
            case 'Warning': return <Badge bg="warning" text="dark" pill><FontAwesomeIcon icon={faExclamationTriangle} className="me-1"/> Warning</Badge>;
            case 'Info': return <Badge bg="info" pill><FontAwesomeIcon icon={faShieldAlt} className="me-1"/> Info</Badge>;
            default: return <Badge bg="secondary" pill>{severity}</Badge>;
        }
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'Power Failure': return <FontAwesomeIcon icon={faBolt} className="text-danger" />;
            case 'Tamper Alert': return <FontAwesomeIcon icon={faShieldAlt} className="text-danger" />;
            case 'Comm Loss': return <FontAwesomeIcon icon={faWifi} className="text-warning" />;
            case 'Firmware Update': return <FontAwesomeIcon icon={faMicrochip} className="text-info" />;
            default: return <FontAwesomeIcon icon={faExclamationCircle} className="text-secondary" />;
        }
    };

    return (
        <div className='container my-3'>
            <div className="main-card py-3 px-3">
                <PageHeader title="Event Dashboard" subtitle="Real-time event tracking across smart endpoints" exportData={events} />

                {/* Top KPI Cards */}
                <Row className="mb-4">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3 h-100" style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px', letterSpacing: '1px' }}>Total Events (24h)</h6>
                            <h2 className="fw-bold text-dark mb-0">1,840</h2>
                            <small className="text-danger fw-bold"><FontAwesomeIcon icon={faChartLine} className="me-1"/>+12.4% vs yesterday</small>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3 h-100" style={{ background: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px', letterSpacing: '1px' }}>Active Critical Alerts</h6>
                            <h2 className="fw-bold text-danger mb-0">34</h2>
                            <small className="text-danger fw-bold"><FontAwesomeIcon icon={faExclamationTriangle} className="me-1"/>Requires Immediate Action</small>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-3 h-100" style={{ background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
                            <h6 className="text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '12px', letterSpacing: '1px' }}>Resolution Rate</h6>
                            <h2 className="fw-bold text-primary mb-0">94.2%</h2>
                            <small className="text-success fw-bold"><FontAwesomeIcon icon={faCheckCircle} className="me-1"/>Grid stability nominal</small>
                        </Card>
                    </Col>
                </Row>

                {/* Charts Section */}
                <Row className="mb-4">
                    <Col md={5}>
                        <div className="widget-card shadow-sm rounded-4 p-3 h-100" style={{ backgroundColor: '#fff' }}>
                            <h6 className="fw-bold text-dark mb-3">Event Distribution</h6>
                            <ReactEcharts option={donutChartOption} style={{ height: '300px' }} />
                        </div>
                    </Col>
                    <Col md={7}>
                        <div className="widget-card shadow-sm rounded-4 p-3 h-100" style={{ backgroundColor: '#fff' }}>
                            <h6 className="fw-bold text-dark mb-3">Event Volume (Last 7 Days)</h6>
                            <ReactEcharts option={barChartOption} style={{ height: '300px' }} />
                        </div>
                    </Col>
                </Row>

                {/* Data Grid */}
                <div className='widget-card table-responsive shadow-sm rounded-4' style={{ minHeight: "50vh", backgroundColor: '#fff' }}>
                    {/* Toolbar */}
                    <div className='d-flex mb-4 p-3 pb-0 align-items-center border-bottom'>
                        <h6 className="fw-bold mb-0 me-auto">Recent Events Log</h6>
                        <div className='position-relative me-3' style={{ width: '250px' }}>
                            <FontAwesomeIcon icon={faSearch} className="position-absolute text-muted" style={{ top: '10px', left: '12px' }} />
                            <input 
                                className='form-control form-control-sm rounded-pill ps-5' 
                                placeholder="Search source or type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ backgroundColor: '#f8f9fa', border: 'none', padding: '0.4rem 1rem' }}
                            />
                        </div>

                        <Dropdown className='me-2'>
                            <Dropdown.Toggle variant="light" size='sm' className="rounded-pill border-0 shadow-sm text-muted fw-bold">
                                <FontAwesomeIcon icon={faFilter} className="me-2"/>
                                {filterSeverity === 'All' ? 'Filter Severity' : `Severity: ${filterSeverity}`}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setFilterSeverity('Critical')}>Show Critical</Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterSeverity('Warning')}>Show Warning</Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterSeverity('Info')}>Show Info</Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterSeverity('All')}>Show All</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light text-muted" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <tr>
                                <th className="ps-4 border-0">Event ID</th>
                                <th className="border-0">Type</th>
                                <th className="border-0">Severity</th>
                                <th className="border-0">Source</th>
                                <th className="border-0">Timestamp</th>
                                <th className="border-0">Status</th>
                                <th className="border-0 text-center pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '14px' }}>
                            {currentItems.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-5 text-muted">No events match your criteria.</td></tr>
                            ) : (
                                currentItems.map((evt) => (
                                    <tr key={evt.id}>
                                        <td className="ps-4 fw-bold text-secondary font-monospace">{evt.id}</td>
                                        <td className="fw-bold text-dark">
                                            {getTypeIcon(evt.type)} <span className="ms-2">{evt.type}</span>
                                        </td>
                                        <td>{getSeverityBadge(evt.severity)}</td>
                                        <td>{evt.source}</td>
                                        <td className="text-muted">{moment(evt.time).format('MMM Do, h:mm A')}</td>
                                        <td>
                                            {evt.status === 'Resolved' 
                                                ? <span className="text-success fw-bold"><FontAwesomeIcon icon={faCheck} className="me-1"/> Resolved</span>
                                                : <span className="text-danger fw-bold">Active</span>}
                                        </td>
                                        <td className="text-center pe-4">
                                            <Dropdown align="end">
                                                <Dropdown.Toggle variant="light" size="sm" className="btn-icon shadow-sm rounded-circle border-0">
                                                    <FontAwesomeIcon icon={faEllipsisV} className="text-muted" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="shadow border-0 rounded-3" style={{ fontSize: '14px' }}>
                                                    <Dropdown.Item><FontAwesomeIcon icon={faEye} className="me-2 text-primary" /> View Details</Dropdown.Item>
                                                    {evt.status === 'Active' && (
                                                        <Dropdown.Item><FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" /> Acknowledge</Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {filteredEvents.length > 0 && (
                        <div className="d-flex justify-content-between align-items-center p-3 bg-light border-top">
                            <span className="text-muted" style={{ fontSize: '13px' }}>
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEvents.length)} of {filteredEvents.length} events
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
                    )}
                </div>
            </div>
        </div>
    );
}
