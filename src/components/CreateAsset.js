import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default function CreateAsset() {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [label, setLabel] = useState('');
    const [assetProfileName, setAssetProfileName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const assetId = uuidv4();
        const createdTime = moment().valueOf();
        try {
            const response = await fetch('https://localhost:1100/InsertAssetDetail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: {
                        entityType: 'ASSET',
                        id: assetId,
                    },
                    createdTime: createdTime,
                    additionalInfo: "",
                    name,
                    type,
                    label,
                    assetProfileName,                  
                    tenantId: {
                        entityType: 'TENANT',
                        id: '08fd5e60-c400-11ed-b62c-7d8052ad39cf',
                    },
                    customerId:{
                        entityType:'CUSTOMER',
                        id:'2db514ea-deb6-4e2f-8230-7c9698c61837'
                    },
                    assetProfileId: {
                        entityType: "ASSET_PROFILE",
                        id: "09107130-c400-11ed-b62c-7d8052ad39cf"
                      },
                    externalId: "",
                    customerTitle: "SKR",
                    customerIsPublic: false,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('New asset created:', data);
                // clear the form fields
                setName('');
                setType('');
                setLabel('');
                setAssetProfileName('');
                
            } else {
                throw new Error('Failed to create asset');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

  return (
    <div className='container my-3 '>
            <div className=" main-card py-3 px-3">
                <h5 className="fw-bold">Create Asset</h5>
                <div className='widget-card shadow-lg mb-4'>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="form-group mb-3 d-grid"><label>
                            Meter Name:
                            <input className="form-control form-control-sm" type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            Meter Type:
                            <input className="form-control form-control-sm" type="text" value={type} onChange={(event) => setType(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            Label:
                            <input className="form-control form-control-sm" type="text" value={label} onChange={(event) => setLabel(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            Asset Profile Name:
                            <input className="form-control form-control-sm" type="text" value={assetProfileName} onChange={(event) => setAssetProfileName(event.target.value)} required />
                        </label></div>
                       
                        <button type="submit" className='btn btn-primary btn-sm'>Create Asset</button>
                    </form>

                </div>
            </div>
        </div>
  )
}
