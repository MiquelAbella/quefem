import React from "react";
import styles from "./Event.module.css";
import editButton from "../../assets/editButton.png";
import { useNavigate } from "react-router-dom";

export const Event = ({ event, user, setEventToUpdate, setCurrentEvent }) => {
  const navigate = useNavigate();

  const handleSetEventToUpdate = () => {
    setEventToUpdate(event);
    navigate("/edita", { replace: true });
  };

  const handleSetCurrentEvent = () => {
    setCurrentEvent(event);
    navigate(`/event/${event._id}`, { replace: true });
  };

  return (
    <div className={styles.event}>
      <div
        className={styles.image}
        style={{ background: `url(${event.image})`, backgroundSize: "cover" }}
      ></div>
      <p className={styles.date}>{event.date}</p>
      <h4 className={styles.title}>{event.title}</h4>
      <h5 className={styles.place}>{event.place}</h5>
      <button onClick={handleSetCurrentEvent} className={styles.info}>
        +
      </button>
      {user && event.owner === user.uid ? (
        <button onClick={handleSetEventToUpdate} className={styles.editButton}>
          <img alt="" className={styles.editButtonImg} src={editButton} />
        </button>
      ) : null}
    </div>
  );
};
