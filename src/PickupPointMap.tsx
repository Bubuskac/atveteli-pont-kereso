import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { GET_PICKUP_POINTS, I } from "./queries";
import { SearchBar } from "./SearchBar";
import { InfoPanel } from "./InfoPanel";
import type { PickupPoint } from "./PickupPoint";

const DEFAULT_CENTER: [number, number] = [47.4979, 19.0402]; // Budapest

export const PickupPointMap: React.FC = () => {
  //useQuery(I)
  const { data, loading, error } = useQuery<{ pickupPoints: PickupPoint[] }, { sessionId: string}>(
    GET_PICKUP_POINTS,
    {
      variables: {
        sessionId: "9f2bb9e8-6653-482d-a953-3932f68dd07a"
      }
    }
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
          <MarkerClusterGroup chunkedLoading>
            {points.map((p) => (
              <Marker
                key={p.id}
                position={[p.location.latitude, p.location.longitude]}
              >
                <Popup>
                  <strong>{p.label}</strong><br />
                  {p.address.addressLine1}<br />
                  {p.address.postalCode} {p.address.city}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          {points.map((p) => (
            <Marker
              key={p.id}
              position={[p.location.latitude, p.location.longitude]}
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
