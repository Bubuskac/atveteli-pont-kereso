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

type session = {
  pickupPoint: {
    pickupPoints: {
      points: {
        data: PickupPoint[]
      }
    }
  }
}

export const PickupPointMap: React.FC = () => {
  //useQuery(I)
  const { data, loading, error } = useQuery<{ session: session }, { sessionId: string, filters: any}>(
    GET_PICKUP_POINTS,
    {
      variables: {
        sessionId: "9f2bb9e8-6653-482d-a953-3932f68dd07a",
        filters: {
          country: "HU"
        }
      }
    }
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelId, setPanelId] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(12);

  const points = useMemo(() => data?.session.pickupPoint.pickupPoints.points.data ?? [], [data]);

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
                eventHandlers={{
                  click: () => setPanelId(p.id),
                }}
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
                click: () => setPanelId(p.id),
              }}
            >
              <Popup>
                <strong>{p.label}</strong><br />
                {p.address.addressLine1}<br />
                {p.address.postalCode} {p.address.city}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div style={{ width: "30%", borderLeft: "1px solid #ddd", padding: "1rem" }}>
        <InfoPanel
          point={points.find((p) => p.id === panelId) ?? null}
          selectedId={selectedId}
          selectedAddress={selectedAddress}
          onSelect={(id, address) => {setSelectedId(id); setSelectedAddress(address)}}
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
