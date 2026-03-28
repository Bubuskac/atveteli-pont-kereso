import React from "react";
import type { PickupPoint } from "./PickupPoint";

type Props = {
  point: PickupPoint | null;
  selectedId: string | null;
  selectedAddress: string | null;
  onSelect: (id: string | null, address: string | null) => void;
};

export const InfoPanel: React.FC<Props> = ({ point, selectedId, selectedAddress, onSelect }) => {
  if (!point) {
    return <div>Nincs kiválasztott csomagpont.</div>;
  }

  const fullAddress = `${point.address.postalCode} ${point.address.city}, ${point.address.addressLine1}, ${point.address.addressLine2}, ${point.address.country}`;

  return (
    <div>
      <h2>{point.label}</h2>
      <p><strong>Cím:</strong> {fullAddress}</p>
      {point.address.note && (
        <p><strong>Megjegyzés:</strong> {point.address.note}</p>
      )}
      {point.openingHours.map((oh) => (
        <p>{oh.day}: {oh.start.hour}:{oh.start.minute} - {oh.end.hour}:{oh.end.minute}</p>
      ))}

      <button
        onClick={() => onSelect(point.id, fullAddress)}
        style={{
          marginTop: "1rem",
          backgroundColor: selectedId === point.id ? "green" : "#007bff",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: 4,
        }}
      >
        {selectedId === point.id ? "Kiválasztva" : "Kiválasztás"}
      </button>

      {selectedId && (
        <p style={{ marginTop: "0.5rem", fontSize: 12 }}>
          Kiválasztott csomagpont címe: {selectedAddress}
        </p>
      )}
    </div>
  );
};
