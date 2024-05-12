"use client";
import React, { useState, useEffect } from "react";
import { TileLayer, Marker, Popup, useMapEvents, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { auth, db } from "@/firebase-config";
import { collection, getDocs, query, where, addDoc, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { MapEventsProps, MarkerData, SaveMapSettingsParams } from "./types";
import Markers from "./Markers";


const LeafletMap= ()=> { 
  const [zoom, setZoom] = useState(13);
  const [userMarkers, setUserMarkers] = useState<MarkerData[]>([]);
  const [userLocation, setUserLocation] = useState<L.LatLng>(); 
  const [center, setCenter] = useState(new L.LatLng(39, 35)); 
  const [loading, setLoading] = useState(true);
  const [userLastLocation, setUserLastLocation] = useState<L.LatLng>(); 

  const MapEvents: React.FC<MapEventsProps> = ({ onMapChange }) => {
    const map = useMapEvents({
      zoomend: () => {
        onMapChange(map.getZoom(), map.getCenter());
      },
      moveend: () => {
        onMapChange(map.getZoom(), map.getCenter());
      },
    });

    return null;
  };
  const lastLocationIcon = L.divIcon({
    html: "<img src=\"https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png\" style=\"width: 25px; height: 25px;\">",
    className: "",
    iconSize: [25, 25] 
  });


  const saveMapSettings = async ({ uid, zoom, center }: SaveMapSettingsParams) => {
    try {
      await setDoc(doc(db, "lastLocation", uid), {
        zoom,
        latitude: center.lat,
        longitude: center.lng
      });
    } catch (error) {
      console.error("Error saving map settings:", error);
    }
  };
  const fetchMapSettings = async (uid:string) => {
    try {
      const docRef = doc(db, "lastLocation", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          zoom: data.zoom,
          center: new L.LatLng(data.latitude, data.longitude) 
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching map settings:", error);
      return null;
    }
  };


  useEffect(() => {
    const fetchMarkers = async (uid: string): Promise<MarkerData[]> => {
      const q = query(collection(db, "markers"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const markers: MarkerData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        markers.push({
          id: doc.id, 
          latitude: data.latitude, 
          longitude: data.longitude 
        });
      });
      return markers;
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = new L.LatLng(latitude, longitude);
        setUserLocation(currentLocation); 
        setCenter(currentLocation);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting current position:", error);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );

    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLoading(true);
        const fetchedMarkers = await fetchMarkers(user.uid);
        const settings = await fetchMapSettings(user.uid);
        if (settings) {
          setZoom(settings.zoom);
          setCenter(settings.center);
          setUserLastLocation(settings.center); 
        } 
        setUserMarkers(fetchedMarkers);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMapChange = (newZoom: number, newCenter: L.LatLng) => {
    setZoom(newZoom);
    setCenter(newCenter);
    if (auth.currentUser) {
      saveMapSettings({ uid: auth.currentUser.uid, zoom: newZoom, center: newCenter });
    }
  };

  const removeMarker = async (markerId: string) => {
    if (!markerId) {
      console.error("Error: Marker ID is undefined.");
      return;
    }
    try {
      await deleteDoc(doc(db, "markers", markerId));
      setUserMarkers(currentMarkers => currentMarkers.filter(marker => marker.id !== markerId));
    } catch (error) {
      console.error("Error removing marker:", error);
    }
  };

  const addMarkerToFirebase = async (marker: MarkerData) => {
    try {
      const docRef = await addDoc(collection(db, "markers"), {
        uid: auth.currentUser?.uid,
        latitude: marker.latitude,
        longitude: marker.longitude,
        timestamp: new Date()
      });
      const newMarker = { ...marker, id: docRef.id };
      setUserMarkers(prevMarkers => [...prevMarkers, newMarker]);
    } catch (error) {
      console.error("Error adding marker to Firebase:", error);
    }
  };



  if (loading) return <div>Loading map...</div>;

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents onMapChange={handleMapChange} />
      <Markers 
        userMarkers={userMarkers} 
        userLocation={userLocation}
        removeMarker={removeMarker}
        addMarkerToFirebase={addMarkerToFirebase}
      />
      {userLastLocation && (
        <Marker position={userLastLocation} icon={lastLocationIcon}>
          <Popup>Last visited location 📍</Popup>
        </Marker>
      )}
    </MapContainer>
  );

};
export default LeafletMap;
