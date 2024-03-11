import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocations";
import Button from "./Button";

export default function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [curPos, setCurPos] = useState([lat || 38.72, lng || -9.14]);

  useEffect(() => {
    if (lat && lng) setCurPos([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setCurPos([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use current position"}
      </Button>
      <MapContainer
        center={curPos}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {generateMarkers(cities, navigate)}
        <ChangeCenter position={curPos} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.closePopup();
  map.setView(position, 13);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log(e);
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}

function generateMarkers(allCityData, navigate) {
  return allCityData.map((city) => {
    return (
      <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
        <Popup>
          <span> {city.emoji} </span>
          <span> {city.cityName}</span>
        </Popup>
      </Marker>
    );
  });
}
