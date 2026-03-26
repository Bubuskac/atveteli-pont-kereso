import React from "react";

type Props = {
  point: {
    id: string;
    name: string;
    type: string;
    address: {
      city: string;
      street: string;
      zip: string;
      country: string;
    };
    openingHours?: string;
  } | null;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

export const InfoPanel: React.FC<Props> = ({ point, selectedId, onSelect }) => {
  if (!point) {
    return <div>Nincs kiválasztott csomagpont.</div>;
  }

  const fullAddress = `${point.address.zip} ${point.address.city}, ${point.address.street}, ${point.address.country}`;

  return (
    <div>
      <h2>{point.name}</h2>
      <p><strong>Típus:</strong> {point.type}</p>
      <p><strong>Cím:</strong> {fullAddress}</p>
      {point.openingHours && (
        <p><strong>Nyitva tartás:</strong> {point.openingHours}</p>
      )}

      <button
        onClick={() => onSelect(point.id)}
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
          Kiválasztott csomagpont ID: {selectedId}
        </p>
      )}
    </div>
  );
};
