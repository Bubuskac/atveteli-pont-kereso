export type PickupPoint = {
  id: string;
  referenceId: string;
  label: string;
  address: {
    city: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    country: string;
    state: string;
    note: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string;
};