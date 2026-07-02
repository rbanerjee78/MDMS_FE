import React, { useState, useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';
import PropTypes from "prop-types";

import markersData from '../markers.json';

// Fix for default Leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function Home({isDarkMode}) {

    


    const MapContainer = ({ markers, isActive }) => {

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [zoom, setZoom] = useState(12);
  const defaultCenter = [18.5204, 73.8567];

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

   const activeIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  const inactiveIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }); 

  const MapUpdater = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  const currentCenter = selectedMarker ? [selectedMarker.latitude, selectedMarker.longitude] : defaultCenter;

  return (
    <>
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
      <div style={{ width: "100%", height: "400px" }}>
        <LeafletMap center={defaultCenter} zoom={zoom} style={{ width: "100%", height: "100%", zIndex: 1 }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapUpdater center={currentCenter} zoom={zoom} />
          {filteredMarkers.map((marker) => (
            <Marker 
              key={marker.meterNo} 
              position={[marker.latitude, marker.longitude]} 
              eventHandlers={{ click: () => handleMarkerClick(marker) }}
              icon={marker.status === "active" ? activeIcon : inactiveIcon}
            >
              <Popup>
                <div>Meter Number: {marker.meterNo}</div>
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      </div>
    </>
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
            <div className={`widget-card ${isDarkMode ? 'dark-mode' : 'light-mode'} w-100 pb-5`} >
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
