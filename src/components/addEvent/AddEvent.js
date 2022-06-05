import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddEvent.module.css";
import axios from "axios";

export const AddEvent = ({ user }) => {
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: "",
    place: "",
    date: "",
    start: "",
    end: "",
    price: "",
    description: "",
    category: "concerts",
    image: null,
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
        .post("http://localhost:5000/createEvent", {
          formValues,
          user: user.uid,
        })
        .then(() => navigate("/", { replace: true }));
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
          placeholder="Títol"
        />
        <input
          onChange={handleFormChange}
          name="place"
          value={formValues.place}
          className={styles.input}
          type="text"
          placeholder="Lloc"
        />
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
          placeholder="descripció"
        />
        <div className={styles.dateGroup}>
          <label className={styles.label} htmlFor="category">
            Categoría
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
          *Si la imatge no és quadrada, es retallarà.
        </p>

        <button type="submit">Afegeix</button>
      </form>
    </div>
  );
};
