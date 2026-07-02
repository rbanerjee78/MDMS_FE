import PageHeader from './PageHeader';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateProfile() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('DEFAULT');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                name,
                description,
                type,
                createdTime: Date.now()
            };
            
            const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/deviceProfile`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.status === 200) {
                setSuccess(true);
                setName('');
                setDescription('');
                setType('DEFAULT');
            }
        } catch (error) {
            console.error('Failed to create device profile:', error);
        }
    };

    return (
        <div className='container my-3 '>
            <div className=" main-card py-3 px-3">
                <PageHeader title="Create Profile" subtitle="Register a new device profile configuration" />
                <div className='widget-card mb-4 p-4 rounded bg-white' style={{ maxWidth: '600px' }}>
                    {success &&
                        <div className="alert alert-success alert-dismissible" role="alert">
                            Device profile created successfully!
                            <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
                        </div>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3 d-grid">
                            <label className="fw-semibold mb-1">Profile Name:</label>
                            <input 
                                className="form-control form-control-sm" 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                placeholder="e.g. Default Smart Meter"
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
                                placeholder="e.g. Standard 15-minute interval reading profile"
                            />
                        </div>
                        <div className="form-group mb-4 d-grid">
                            <label className="fw-semibold mb-1">Profile Type:</label>
                            <select 
                                className="form-select form-select-sm" 
                                value={type} 
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="DEFAULT">Default</option>
                                <option value="ADVANCED">Advanced</option>
                            </select>
                        </div>
                        <button type="submit" className='btn btn-primary btn-sm px-4'>Create Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
