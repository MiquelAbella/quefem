import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main } from "./components/main/Main";
import { Nav } from "./components/nav/Nav";
import { Login } from "./components/login/Login";
import { AddEvent } from "./components/addEvent/AddEvent";
import { UpdateEvent } from "./components/updateEvent/UpdateEvent";
import { EventInfo } from "./components/eventInfo/EventInfo";

function App() {
  const [user, setUser] = useState(null);
  const [isLoginShown, setIsLoginShown] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState({});
  const [currentEvent, setCurrentEvent] = useState({});
  const [eventsList, setEventsList] = useState([]);
  const [allEvents, setallEvents] = useState([]);
  const [filter, setFilter] = useState("Tots");
  const [dateFilter, setDateFilter] = useState(Infinity);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getEvents")
      .then((res) => {
        if (res.data.ok) {
          setEventsList(
            res.data.events.sort((a, b) => {
              return (
                parseFloat(Date.parse(a.date)) - parseFloat(Date.parse(b.date))
              );
            })
          );
          setallEvents(
            res.data.events.sort((a, b) => {
              return (
                parseFloat(Date.parse(a.date)) - parseFloat(Date.parse(b.date))
              );
            })
          );
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Nav
        user={user}
        setFilter={setFilter}
        setDateFilter={setDateFilter}
        setIsLoginShown={setIsLoginShown}
        setEventsList={setEventsList}
        eventsList={eventsList}
        allEvents={allEvents}
      />
      {isLoginShown && !user ? (
        <Login
          setUser={setUser}
          user={user}
          setIsLoginShown={setIsLoginShown}
        />
      ) : null}
      <Routes>
        <Route
          path="/"
          element={
            <Main
              dateFilter={dateFilter}
              filter={filter}
              isLoading={isLoading}
              setEventToUpdate={setEventToUpdate}
              user={user}
              setCurrentEvent={setCurrentEvent}
              eventsList={eventsList}
            />
          }
        >
          <Route
            path="/"
            element={
              <Main
                setEventToUpdate={setEventToUpdate}
                user={user}
                setCurrentEvent={setCurrentEvent}
              />
            }
          />
        </Route>
        <Route path="/afegir" element={<AddEvent user={user} />}>
          <Route path="/afegir" element={<AddEvent user={user} />} />
        </Route>
        <Route
          path="/edita"
          element={<UpdateEvent eventToUpdate={eventToUpdate} user={user} />}
        >
          <Route
            path="/edita"
            element={<UpdateEvent eventToUpdate={eventToUpdate} user={user} />}
          />
        </Route>
        <Route path="event">
          <Route
            path=":id"
            element={<EventInfo currentEvent={currentEvent} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
