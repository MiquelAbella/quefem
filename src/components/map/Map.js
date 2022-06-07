import React, { useRef, useEffect, useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Map.module.css";
import addButton from "../../assets/addButton.png";

export const Map = ({ eventsList, setCurrentEvent, user }) => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const viewport = useRef({
    latitude: 41.6173,
    longitude: 0.6292,
    zoom: 11,
    height: "80vh",
    width: "80vw",
  });

  useEffect(() => {
    setIsMounted(!isMounted);
  }, []);

  return (
    <div>
      <ReactMapGl
        style={{ width: "80vw", height: "80vh", margin: "5vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        {...viewport.current}
        ref={viewport}
        mapboxAccessToken="pk.eyJ1IjoibWlrZWJlZWdhciIsImEiOiJja3c1NXJ1bm0wNDZtMnZsNWZyemI2MDNhIn0.bUNhmu4ASbT7GIb25uExSw"
        onMove={(viewport) => {
          viewport.current = viewport;
        }}
      >
        {eventsList.map((event, idx) => (
          <Marker
            onClick={() => {
              setCurrentEvent(event);
              navigate(`/event/${event._id}`, { replace: true });
            }}
            key={idx}
            latitude={event.coordinates.lng}
            longitude={event.coordinates.lat}
          ></Marker>
        ))}
      </ReactMapGl>
      {user ? (
        <Link className={styles.addButton} to="/afegir">
          <img alt="" className={styles.addButtonImg} src={addButton} />
        </Link>
      ) : null}
    </div>
  );
};
