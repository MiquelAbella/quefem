import React, { useState, useRef } from "react";
import styles from "./Login.module.css";
import axios from "axios";

export const Login = ({ setIsLoginShown, setUser }) => {
  const [isLoging, setIsLoging] = useState(true);


  const getCoords = (e) => {
    console.log(e);
  };

  const [loginValues, setLoginValues] = useState({
    lemail: "",
    lpassword: "",
  });
  const [registerValues, setRegisterValues] = useState({
    remail: "",
    rpassword: "",
    rpassword2: "",
  });

  const handleLogingChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };
  const handleRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = () => {
    axios
      .post("https://quefem.herokuapp.com/loginUser", loginValues)
      .then((res) => setUser(res.data.user));
  };
  const handleSubmitRegister = () => {
    axios
      .post("https://quefem.herokuapp.com/createUser", registerValues)
      .then((res) => setUser(res.data.user));
  };

  const handleSwitchForm = () => {
    setIsLoging(!isLoging);
  };

  return (
    <div className={`animate__animated animate__fadeIn ${styles.login}`}>
      <h2 onClick={() => setIsLoginShown(false)} className={styles.closeButton}>
        x
      </h2>
      {isLoging ? (
        <>
          <div className={styles.loginForm}>
            <h1>ENTRA</h1>
            <input
              className={styles.input}
              placeholder="email"
              value={loginValues.lemail}
              type="email"
              name="lemail"
              onChange={handleLogingChange}
            />
            <input
              className={styles.input}
              placeholder="clau"
              value={loginValues.lpassword}
              type="password"
              name="lpassword"
              onChange={handleLogingChange}
            />
            <button className={styles.button} onClick={handleSubmitLogin}>
              Entra
            </button>
          </div>
          <p className={styles.switcher} onClick={handleSwitchForm}>
            No tens compte?
          </p>
        </>
      ) : (
        <>
          <div className={styles.registerForm}>
            <h1>REGISTRA'T</h1>
            <input
              className={styles.input}
              placeholder="email"
              value={registerValues.remail}
              type="email"
              name="remail"
              onChange={handleRegisterChange}
            />
            <input
              className={styles.input}
              placeholder="clau"
              value={registerValues.rpassword}
              type="password"
              name="rpassword"
              onChange={handleRegisterChange}
            />
            <input
              className={styles.input}
              placeholder="repeteix clau"
              value={registerValues.rpassword2}
              type="password"
              name="rpassword2"
              onChange={handleRegisterChange}
            />
            <button className={styles.button} onClick={handleSubmitRegister}>
              Registra't
            </button>
          </div>
          <p className={styles.switcher} onClick={handleSwitchForm}>
            Ja tens compte?
          </p>
        </>
      )}
    </div>
  );
};
