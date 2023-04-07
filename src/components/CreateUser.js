import React, { useState } from 'react';
import axios from 'axios';

export default function CreateUser() {

    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [success, setSuccess] = useState(false);

   

    const handleSubmit = async (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem('authToken');
        const payload = {
          title,
          country,
          state,
          city,
          address,
          address2,
          zip: zipCode,
          phone: phoneNumber,
          email,
        };
        try {
          const response = await axios.post('https://localhost:1100/api/customer', payload, {
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              'X-Authorization': `Bearer ${authToken}`,
            },
          });
          if (response.status === 200) {
            const data = response.data;
            console.log('New user created:', data);
            setSuccess(true);
            // clear the form fields
            setTitle('');
            setEmail('');
            setPhoneNumber('');
            setCity('');
            setState('');
            setCountry('');
            setZipCode('');
            setAddress('');
          } else {
            throw new Error('Failed to create user');
          }
        } catch (error) {
          console.error(error.message);
        }
      };


    return (
        <div className='container my-3 '>
            <div className=" main-card py-3 px-3">
                <h5 className="fw-bold">Create User</h5>
                <div className='widget-card shadow-lg mb-4'>
                {success &&
            <div className="alert alert-success alert-dismissible" role="alert">User created successfully!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          }
                    <form onSubmit={handleSubmit}>
                        <div className='form-group mb-3 d-grid d-grid'><label>
                            Name:
                            <input className='form-control form-control-sm' type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
                        </label>
                        </div>


                        <div className="form-group mb-3 d-grid"><label>
                            Email:
                            <input className="form-control form-control-sm" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            Phone Number:
                            <input className="form-control form-control-sm" type="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            City:
                            <input className="form-control form-control-sm" type="text" value={city} onChange={(event) => setCity(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            State:
                            <input className="form-control form-control-sm" type="text" value={state} onChange={(event) => setState(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            Country:
                            <input className="form-control form-control-sm" type="text" value={country} onChange={(event) => setCountry(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            Zip Code:
                            <input className="form-control form-control-sm" type="text" value={zipCode} onChange={(event) => setZipCode(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            Address:
                            <input className="form-control form-control-sm" type="text" value={address} onChange={(event) => setAddress(event.target.value)} required />
                        </label></div>
                        <div className="form-group mb-3 d-grid"><label>
                            Address2:
                            <input className="form-control form-control-sm" type="text" value={address2} onChange={(event) => setAddress2(event.target.value)} required />
                        </label></div>
                        <button type="submit" className='btn btn-primary btn-sm'>Create User</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
