import PageHeader from './PageHeader';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateDevice() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('default');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                name,
                additionalInfo: { description },
                deviceData: { configuration: { type } },
                customerId: null
            };
            
            const authToken = localStorage.getItem('authToken');
            const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/device`, payload, {
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Authorization': `Bearer ${authToken}`
                }
            });
            
            if (response.status === 200) {
                setSuccess(true);
                setName('');
                setDescription('');
                setType('default');
                // Optional: navigate back after a delay
                // setTimeout(() => navigate('/tenantdevices'), 2000);
            }
        } catch (error) {
            console.error('Failed to create device:', error);
        }
    };

    return (
        <div className='container my-3 '>
            <div className=" main-card py-3 px-3">
                <PageHeader title="Create Device" subtitle="Register a new telemetry endpoint" />
                <div className='widget-card mb-4 p-4 rounded bg-white' style={{ maxWidth: '600px' }}>
                    {success &&
                        <div className="alert alert-success alert-dismissible" role="alert">
                            Device created successfully!
                            <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
                        </div>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3 d-grid">
                            <label className="fw-semibold mb-1">Device Name:</label>
                            <input 
                                className="form-control form-control-sm" 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                placeholder="e.g. Smart Meter TX-1000"
                            />
                        </div>
                        <div className="form-group mb-3 d-grid">
                            <label className="fw-semibold mb-1">Description:</label>
                            <input 
                                className="form-control form-control-sm" 
                                type="text" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                required 
                                placeholder="e.g. Main residential power meter"
                            />
                        </div>
                        <div className="form-group mb-4 d-grid">
                            <label className="fw-semibold mb-1">Configuration Type:</label>
                            <select 
                                className="form-select form-select-sm" 
                                value={type} 
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="default">Default</option>
                                <option value="high-voltage">High Voltage</option>
                                <option value="commercial">Commercial</option>
                            </select>
                        </div>
                        <button type="submit" className='btn btn-primary btn-sm px-4'>Create Device</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
