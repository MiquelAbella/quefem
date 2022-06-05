import React from "react";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";

import addButton from "../../assets/addButton.png";
import { Event } from "../event/Event";

export const Main = ({
  user,
  setEventToUpdate,
  setCurrentEvent,
  eventsList,
  isLoading,
  filter,
  dateFilter,
}) => {
  return (
    <div>
      {!isLoading ? (
        eventsList.map((event, idx) => {
          if (filter === "Tots" && Date.parse(event.date) < dateFilter) {
            return (
              <Event
                setCurrentEvent={setCurrentEvent}
                key={idx}
                index={idx}
                event={event}
                setEventToUpdate={setEventToUpdate}
                user={user}
              />
            );
          } else if (
            filter.toLowerCase() === event.category &&
            eventsList.filter((evt) => evt.category === filter.toLowerCase())
              .length &&
            Date.parse(event.date) < dateFilter
          ) {
            return (
              <Event
                setCurrentEvent={setCurrentEvent}
                key={idx}
                index={idx}
                event={event}
                setEventToUpdate={setEventToUpdate}
                user={user}
              />
            );
          } else if (idx === 0) {
            return (
              <h1 className={styles.msg} key={idx}>
                Res a mostrar
              </h1>
            );
          }
        })
      ) : (
        <h1>Carregant...</h1>
      )}

      {user ? (
        <Link className={styles.addButton} to="/afegir">
          <img alt="" className={styles.addButtonImg} src={addButton} />
        </Link>
      ) : null}
    </div>
  );
};
