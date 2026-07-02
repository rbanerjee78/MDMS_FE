import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';
import markers from '../markers.json';

// Fix for default Leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapContainer = ({ isActive }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [zoom, setZoom] = useState(12);
  const defaultCenter = [18.5204, 73.8567];

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

  const currentCenter = selectedMarker ? [selectedMarker.latitude, selectedMarker.longitude] : defaultCenter;

  return (
    <>
      <div className="col-lg-3 mb-3">
        <select id="meter-dropdown" className="form-control" onChange={handleDropdownChange} value={selectedMarker?.meterNo || ""}>
          <option value="">-- Select a meter --</option>
          {markers.map((marker) => (
            <option key={marker.meterNo} value={marker.meterNo}>
              {marker.meterNo}
            </option>
          ))}
        </select>
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
  isActive: PropTypes.bool,
};

export default MapContainer;
