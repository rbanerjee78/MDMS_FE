import React, { useState } from "react";
import PropTypes from "prop-types";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import markers from '../markers.json';


const MapContainer = ({ isActive }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [zoom, setZoom] = useState(12);
  const defaultCenter = { lat: 18.5204, lng: 73.8567 };
  const API_KEY = "AIzaSyAHtSqgkZ7PfaA5jtTBHVUZ4iQbVLa7pkE"

  const filteredMarkers = markers.filter(marker => {
    return marker.status === (isActive ? "active" : "inactive");
  });

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setZoom(15);
  };

  const handleDropdownChange = (event) => {
    const selectedMeter = event.target.value;
    const marker = markers.find((m) => m.meterNo === selectedMeter) || null;
    setSelectedMarker(marker);
    setZoom(15);
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <div className="col-lg-3">
        <select id="meter-dropdown" className="form-control" onChange={handleDropdownChange} value={selectedMarker?.meterNo || null}>
          <option value={null}>-- Select a meter --</option>
          {markers.map((marker) => (
            <option key={marker.meterNo} value={marker.meterNo}>
              {marker.meterNo}
            </option>
          ))}
        </select>
      </div>
      <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} zoom={zoom} center={selectedMarker ? { lat: selectedMarker.latitude, lng: selectedMarker.longitude } : defaultCenter}>
        {filteredMarkers.map((marker) => (
          <Marker key={marker.meterNo} position={{ lat: marker.latitude, lng: marker.longitude }} onClick={() => handleMarkerClick(marker)} />
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
 // isActive: PropTypes.bool.isRequired,
};

export default MapContainer;
