import React, { useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onLocationFound: (coords: [number, number]) => void;
};

export const SearchBar: React.FC<Props> = ({ value, onChange, onLocationFound }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}`
      );
      const data = await res.json();
      if (data.length === 0) {
        setError("Nem található ilyen cím/város.");
      } else {
        const { lat, lon } = data[0];
        onLocationFound([parseFloat(lat), parseFloat(lon)]);
      }
    } catch {
      setError("Hiba történt a keresés közben.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{ position: "absolute", top: 10, left: 10, zIndex: 1000, background: "white", padding: 8, borderRadius: 4 }}
    >
      <input
        type="text"
        placeholder="Város vagy cím..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button type="submit" disabled={loading}>
        Keresés
      </button>
      {loading && <span style={{ marginLeft: 8 }}>Keresés...</span>}
      {error && <div style={{ color: "red", marginTop: 4 }}>{error}</div>}
    </form>
  );
};
