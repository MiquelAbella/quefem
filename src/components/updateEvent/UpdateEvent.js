
/*eslint import/no-webpack-loader-syntax: off*/
import React, { useState, useRef, useEffect } from "react";
// @ts-ignore
import ReactMapGl, { Marker } from "!react-map-gl";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateEvent.module.css";
import axios from "axios";

export const UpdateEvent = ({
  user,
  eventToUpdate,
  setEventsList,
  eventsList,
}) => {
  const {
    title,
    place,
    date,
    start,
    end,
    price,
    description,
    category,
    image,
    coordinates,
  } = eventToUpdate;

  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: title,
    place: place,
    date: date,
    start: start,
    end: end,
    price: price,
    description: description,
    category: category,
    image: image,
    location: coordinates,
  });
  console.log(formValues);
  const getCoords = (e) => {
    setFormValues({
      ...formValues,
      location: [e.lngLat.lat, e.lngLat.lng],
    });
  };

  const viewport = useRef({
    latitude: 41.6173,
    longitude: 0.6292,
    zoom: 11,
    height: "40vh",
    width: "90vw",
  });

  const handleFormChange = (e) => {
    if (e.target.id === "upload-img") {
      setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!Object.values(formValues).filter((val) => val === "").length) {
      const formData = new FormData();
      formData.append("file", formValues.image);
      formData.append("upload_preset", "pgckkypy");
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dfjelhshb/image/upload/",
          formData
        )
        .then((res) => (formValues.image = res.data.url));

      axios
        .post("https://quefem.herokuapp.com/updateEvent", {
          formValues,
          _id: eventToUpdate._id,
          user: user.uid,
        })
        .then((res) => {
          setEventsList([
            ...eventsList.filter((evt) => evt._id !== eventToUpdate._id),
            res.data.event,
          ]);
        })
        .then(() => {
          navigate("/", { replace: true });
        });
    } else {
      console.log("fill all camps");
    }
  };

  return (
    <div className={styles.addEvent}>
      <form className={styles.form} onSubmit={submitForm}>
        <input
          onChange={handleFormChange}
          name="title"
          value={formValues.title}
          className={styles.input}
          type="text"
          placeholder="T??tol"
        />
        <div className={styles.inputGroup}>
          <input
            onChange={handleFormChange}
            name="place"
            value={formValues.place}
            className={styles.input}
            type="text"
            placeholder="Adre??a"
          />
        </div>
        <input
          onChange={handleFormChange}
          name="date"
          value={formValues.date}
          className={styles.input}
          type="date"
          placeholder="Dia"
        />
        <div className={styles.dateGroup}>
          <label className={styles.label} htmlFor="inici">
            Inici
          </label>
          <input
            onChange={handleFormChange}
            name="start"
            value={formValues.start}
            className={styles.input}
            type="time"
            placeholder="Hora inici"
            id="inici"
          />
        </div>
        <div className={styles.dateGroup}>
          <label className={styles.label} htmlFor="final">
            final
          </label>
          <input
            onChange={handleFormChange}
            name="end"
            value={formValues.end}
            className={styles.input}
            type="time"
            placeholder="Hora fi"
            id="final"
          />
        </div>
        <input
          onChange={handleFormChange}
          name="price"
          value={formValues.price}
          className={styles.input}
          type="text"
          placeholder="Preu"
        />
        <textarea
          name="description"
          onChange={handleFormChange}
          value={formValues.description}
          className={styles.textarea}
          placeholder="descripci??"
        />
        <div className={styles.dateGroup}>
          <label className={styles.label} htmlFor="category">
            Categor??a
          </label>
          <select
            onChange={handleFormChange}
            className={styles.category}
            id="category"
            name="category"
          >
            <option value="concerts">Concerts</option>
            <option value="teatre">Teatre</option>
            <option value="festa">Festa</option>
            <option value="altres">Altres</option>
          </select>
        </div>
        <input
          type="file"
          id="upload-img"
          onChange={handleFormChange}
          name="image"
        />
        <p className={styles.imageMsg}>
          *Si la imatge no ??s quadrada, es retallar??.
        </p>
        <div className={styles.mapGroup}>
          <p>Clica al mapa per afegir la ubicaci??</p>
          <ReactMapGl
            onClick={getCoords}
            style={{ width: "90vw", height: "40vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            {...viewport.current}
            ref={viewport}
            mapboxAccessToken="pk.eyJ1IjoibWlrZWJlZWdhciIsImEiOiJja3c1NXJ1bm0wNDZtMnZsNWZyemI2MDNhIn0.bUNhmu4ASbT7GIb25uExSw"
            onMove={(viewport) => {
              viewport.current = viewport;
            }}
          >
            <Marker
              key="location"
              latitude={formValues.location.lng}
              longitude={formValues.location.lat}
            ></Marker>
          </ReactMapGl>
        </div>

        <button type="submit">Afegeix</button>
      </form>
    </div>
  );
};
