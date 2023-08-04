import React, { useState } from "react";
import { saveAs } from "file-saver"; 
import { v4 as uuidv4 } from 'uuid';



export default function CreateMeter() {
    
    const [meterData, setMeterData] = useState({
        meterTypeName: '',
        physicalAddress: '',
        makeCountry: '',
        serialNumber: '',
        systemTitle: '',
      });
    
      const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
      const handleInputChange = (event) => {
        setMeterData({
          ...meterData,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const id = uuidv4();
        const newMeter = { ...meterData, id };
        const meters = JSON.parse(localStorage.getItem('meters')) || [];
        meters.push(newMeter);
        localStorage.setItem('meters', JSON.stringify(meters));
        setShowSuccessMessage(true);
      };
    
      const handleExport = () => {
        const meters = JSON.parse(localStorage.getItem('meters')) || [];
        const blob = new Blob([JSON.stringify(meters)], { type: 'application/json' });
        saveAs(blob, 'saveMeter.json');
      };


    return (
        <div className='container my-3' >
            <div className=" main-card py-3 px-3 ">
                <div className="">
                    <h5 className='fw-bold'>Create Meter</h5>
                    <div className="widget-card shadow-lg">


                    <div className="container">

                    {showSuccessMessage && <div className="alert alert-success" role="alert">Meter data has been successfully added!</div>}

      <form onSubmit={handleSubmit}>
      <div className="form-group col-lg-12">
        <label className="form-label d-block">
          Meter Type Name:
          <input className="form-control  mb-4"
            type="text"
            name="meterTypeName"
            value={meterData.meterTypeName}
            onChange={handleInputChange}
          />
        </label>
       </div>

       <div className="form-group col-lg-12">
        <label className="form-label d-block">
          Physical Address:
          <input className="form-control  mb-4"
            type="text"
            name="physicalAddress"
            value={meterData.physicalAddress}
            onChange={handleInputChange}
          />
        </label>
    </div>

    <div className="form-group col-lg-12">
        <label className="form-label d-block">
          Make Country:
          <input className="form-control  mb-4"
            type="text"
            name="makeCountry"
            value={meterData.makeCountry}
            onChange={handleInputChange}
          />
        </label>
       </div>

       <div className="form-group col-lg-12">
        <label className="form-label d-block"> 
          Serial Number:
          <input className="form-control  mb-4"
            type="text"
            name="serialNumber"
            value={meterData.serialNumber}
            onChange={handleInputChange}
          />
        </label>
    </div>

    <div className="form-group col-lg-12">
        <label className="form-label d-block">
          System Title:
          <input className="form-control mb-4"
            type="text"
            name="systemTitle"
            value={meterData.systemTitle}
            onChange={handleInputChange}
          />
        </label>
      </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>




                    </div>
                </div>
            </div>
        </div>
    )
}
