import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Modern custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const StoresMap = ({ address, name }) => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await res.json();
        if (data && data[0]) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (err) {
        console.error("Geocoding error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [address]);

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-200 rounded-3xl animate-pulse flex items-center justify-center text-gray-500">
        Loading map...
      </div>
    );
  }

  if (!position) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
        Location not available
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full transition-transform duration-300 ease-in-out hover:scale-[1.01]"
      >
        {/* Modern map theme (Carto Light or Stadia Alidade Smooth) */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            <div className="text-sm font-semibold text-gray-800">
              {name || "Store"}
            </div>
            <div className="text-xs text-gray-500">{address}</div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Subtle overlay gradient for a modern look */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent"></div>
    </div>
  );
};

export default StoresMap;