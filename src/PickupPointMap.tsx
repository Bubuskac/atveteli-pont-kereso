import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GET_PICKUP_POINTS } from "./queries";

type PickupPoint = {
  id: string;
  name: string;
  type: string;
  address: {
    city: string;
    street: string;
    zip: string;
    country: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  openingHours?: string;
};

const DEFAULT_CENTER: [number, number] = [47.4979, 19.0402]; // Budapest

export const PickupPointMap: React.FC = () => {
  const { data, loading, error } = useQuery<{ pickupPoints: PickupPoint[] }>(
    GET_PICKUP_POINTS
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(12);

  const points = useMemo(() => data?.pickupPoints ?? [], [data]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "70%", position: "relative" }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onLocationFound={(coords) => {
            setMapCenter(coords);
            setMapZoom(14);
          }}
        />

        {loading && (
          <div className="overlay">
            Adatok betöltése...
          </div>
        )}

        {error && (
          <div className="overlay error">
            Hiba történt a pontok betöltése közben.
          </div>
        )}

        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter center={mapCenter} zoom={mapZoom} />
          {/* Itt lehetne clusteringet használni */}
          {points.map((p) => (
            <Marker
              key={p.id}
              position={[p.location.lat, p.location.lng]}
              eventHandlers={{
                click: () => setSelectedId(p.id),
              }}
            />
          ))}
        </MapContainer>
      </div>

      <div style={{ width: "30%", borderLeft: "1px solid #ddd", padding: "1rem" }}>
        <InfoPanel
          point={points.find((p) => p.id === selectedId) ?? null}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
        />
      </div>
    </div>
  );
};

const Recenter: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};
