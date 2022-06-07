import React from "react";
import styles from "./EventInfo.module.css";
import { useNavigate } from "react-router-dom";

export const EventInfo = ({ currentEvent, lastPage }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(lastPage, { replace: true });
  };

  return (
    <div className={styles.eventInfo}>
      <button className={styles.goBackButton} onClick={handleGoBack}>
        torna
      </button>
      <h1>{currentEvent?.title}</h1>
      <div
        className={styles.eventImage}
        style={{
          background: `url(${currentEvent?.image})`,
          backgroundSize: "cover",
        }}
      ></div>

      <h4 className={styles.eventDescription}>Dia: {currentEvent?.date}</h4>
      <h4 className={styles.eventDescription}>
        Hora: {currentEvent?.start} - {currentEvent?.end}
      </h4>
      <h4 className={styles.eventDescription}>Lloc: {currentEvent?.place}</h4>
      <h4 className={styles.eventDescription}>Preu: {currentEvent?.price}</h4>
      <p className={styles.eventDescription}>{currentEvent?.description}</p>
      <a
        target="_blank"
        href={`https://www.google.com/search?q=${currentEvent?.coordinates?.lng}+%2C+${currentEvent?.coordinates?.lat}`}
      >
        Ves-hi amb Google Maps
      </a>
    </div>
  );
};
