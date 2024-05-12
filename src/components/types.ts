import { LatLng } from "leaflet";

export interface MarkerData {
  id: string;
  latitude: number;
  longitude: number;
  zoom?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface MapEventsProps {
  onMapChange: (zoom: number, center: L.LatLng) => void;
}

export interface SaveMapSettingsParams {
  uid: string;
  zoom: number;
  center: L.LatLng;
}

export interface RegisterCardProps {
  handleSignUp: (data: SignUpData) => void;  
}

export interface LocationMarkersProps {
  userMarkers: MarkerData[];
  userLocation: LatLng | undefined;
  removeMarker: (markerId: string) => Promise<void>;
  addMarkerToFirebase: (marker: MarkerData) => Promise<void>;
}

