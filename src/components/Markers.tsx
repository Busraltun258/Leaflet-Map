"use client";
import React from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { auth, db } from "@/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import { LocationMarkersProps, MarkerData } from "./types";


const Markers: React.FC<LocationMarkersProps> = ({ userMarkers, userLocation, removeMarker, addMarkerToFirebase }) => {

  console.log(userLocation,"userlocation");
  const userLocationIcon = L.divIcon({
    html: ReactDOMServer.renderToString(<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" fill="blue" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>),
    className: "",
    iconSize: [25, 41]
  });

  const markerIcon = L.divIcon({
    html: "<img src=\"https://www.svgrepo.com/show/376955/map-marker.svg\" style=\"width: 25px; height: 41px;\">",
    className: "",
    iconSize: [25, 41]
  });

  useMapEvents({
    click: async (e) => { 
      const map = e.target;
      try {
        const docRef = await addDoc(collection(db, "markers"), {
          uid: auth.currentUser?.uid,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          timestamp: new Date()
        });
        const newMarker: MarkerData = {
          id: docRef.id,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          zoom: map.getZoom()
        };
        addMarkerToFirebase(newMarker);
      } catch (error) {
        console.error("Error adding marker to Firebase:", error);
      }
    }
  });

  return (
    <>
      {userLocation && (
        <Marker position={userLocation} icon={userLocationIcon}>
          <Popup>You are here 🖐️</Popup>
        </Marker>
      )}
      {userMarkers.map((marker) => (
        <Marker key={marker.id} position={new L.LatLng(marker.latitude, marker.longitude)} icon={markerIcon}>
          <Popup>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
        Location Details
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
        Latitude: {marker.latitude}, Longitude: {marker.longitude}
              </Typography>
              <IconButton onClick={() => removeMarker(marker.id)} sx={{ color: "red" }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default Markers;