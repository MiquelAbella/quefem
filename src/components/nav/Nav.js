import React from "react";
import styles from "./Nav.module.css";

export const Nav = ({
  setIsLoginShown,
  setFilter,
  user,
  setDateFilter,
}) => {
  const handleSetFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSetDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  let oneMonth = 2629800000;
  let oneWeek = 604800000;
  let oneDay = 86400000;

  return (
    <div className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <select className={styles.filter} onChange={handleSetDateFilter}>
            <option value={Infinity}>Data</option>
            <option value={Date.now() + oneMonth}>Mes</option>
            <option value={Date.now() + oneWeek}>Setmana</option>
            <option value={Date.now() + oneDay}>Dia</option>
          </select>
        </li>

        <li className={styles.li}>
          <select className={styles.filter} onChange={handleSetFilter}>
            <option value="Tots">Tipus</option>
            <option value="Concerts">Concerts</option>
            <option value="Teatre">Teatre</option>
            <option value="Festa">Festa</option>
            <option value="Altres">Altres</option>
          </select>
        </li>
        {!user?.uid ? (
          <li onClick={() => setIsLoginShown(true)} className={styles.li}>
            Entra
          </li>
        ) : null}
      </ul>
    </div>
  );
};
