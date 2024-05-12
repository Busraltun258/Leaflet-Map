import { db } from "@/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MarkerData } from "./type";

export const fetchMarkers = async (uid: string): Promise<MarkerData[]> => {
  const q = query(collection(db, "markers"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const markers: MarkerData[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as Partial<MarkerData>;
    markers.push({
      id: doc.id,
      latitude: data.latitude,
      longitude: data.longitude
    });
  });
  return markers;
};

// Include other Firebase operations as needed.
