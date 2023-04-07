import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import PropTypes from "prop-types";

import markersData from '../markers.json';

//AIzaSyAHtSqgkZ7PfaA5jtTBHVUZ4iQbVLa7pkE

export default function Home() {

    


    const MapContainer = ({ markers, isActive }) => {

        const [selectedMarker, setSelectedMarker] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [zoom, setZoom] = useState(12);
  const defaultCenter = { lat: 18.5204, lng: 73.8567 };
  const API_KEY = "AIzaSyAHtSqgkZ7PfaA5jtTBHVUZ4iQbVLa7pkE";

  const filteredMarkers = markers.filter(marker => {
    if (statusFilter === "all") {
      return true;
    } else {
      return marker.status === statusFilter;
    }
  });

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setZoom(15);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setSelectedMarker(null);
    setZoom(12);
  };

   const activeIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    
  };
  
  const inactiveIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    
  }; 

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <div className="col-lg-5 d-flex my-2">
        <div className='form-check'>
          <label className='me-3 form-check-label'>
            <input type="radio" className='form-check-input' name="status-filter" value="all" checked={statusFilter === "all"} onChange={handleStatusFilterChange} />
            All meters
          </label>
        </div>
        <div className='form-check'>
          <label  className='me-3 form-check-label'>
            <input type="radio" className='form-check-input' name="status-filter" value="active" checked={statusFilter === "active"} onChange={handleStatusFilterChange} />
            Active meters
          </label>
        </div>
        <div className='form-check'>
          <label  className='me-3 form-check-label'>
            <input type="radio" className='form-check-input' name="status-filter" value="inactive" checked={statusFilter === "inactive"} onChange={handleStatusFilterChange} />
            Inactive meters
          </label>
        </div>
      </div>
      <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} zoom={zoom} center={selectedMarker ? { lat: selectedMarker.latitude, lng: selectedMarker.longitude } : defaultCenter}>
        {filteredMarkers.map((marker) => (
          <Marker key={marker.meterNo} position={{ lat: marker.latitude, lng: marker.longitude }} onClick={() => handleMarkerClick(marker)} icon={marker.status === "active" ? activeIcon : inactiveIcon} />
        ))}
        {selectedMarker && (
          <InfoWindow position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }} onCloseClick={() => setSelectedMarker(null)}>
            <div>Meter Number: {selectedMarker.meterNo}</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

MapContainer.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      meterNo: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["active", "inactive"]).isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ).isRequired,

};
      

      const Form = () => {
        const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    setMarkers(markersData.markers);
  }, []);

  

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  useEffect(() => {
    if (selectedMarker) {
      setZoom(15);
    } else {
      setZoom(13);
    }
  }, [selectedMarker]);
      
        return (
          <div className='container my-3'>
            <div className='widget-card w-100 pb-5'>
              <div>
               
                <div style={{ height: '500px', width: '100%' }}>
                  <MapContainer markers={markers} selectedMarker={selectedMarker} onMarkerClick={handleMarkerClick} setZoom={setZoom} zoom={zoom} />
                </div>
              </div>
            </div>
          </div>
        );
      };
      

  return <Form />;
}
