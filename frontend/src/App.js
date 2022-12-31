import { useState, createContext, useEffect } from "react";
import "./App.css";
import jwt_decode from "jwt-decode";
import { Home } from "./comp/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav } from "./comp/nav";
import Login from "./comp/login";
import Todo from "./comp/todo";
import Register from "./comp/regi";
export const Conte = createContext();
function App() {
  let [data, setdata] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setuse] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );

  // let updateToken = async () => {
  //   let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ refresh: User?.refresh }),
  //   });

  //   let data = await response.json();

  //   if (response.status === 200) {
  //     setUser(jwt_decode(data.access));
  //     localStorage.setItem("authTokens", JSON.stringify(data));
  //   } else {
  //     logout();
  //   }
  // };
  const logout = () => {
    // setdata(null);

    // setuse(null);
    localStorage.removeItem("authTokens");
    window.location.href = "/";
  };
  // useEffect(() => {
  //   let fourMinutes = 1000 * 60 * 4;

  //   let interval = setInterval(() => {
  //     if (User) {
  //       updateToken();
  //     }
  //   }, fourMinutes);
  //   return () => clearInterval(interval);
  // });

  const login = async (e) => {
    e.preventDefault();
    let res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.passs.value,
      }),
    });

    let d = await res.json();
    if (res.status === 200) {
      setdata(d);

      setuse(jwt_decode(d.access));
      console.log(data, user, 2222);

      localStorage.setItem("authTokens", JSON.stringify(d));
      window.location.href = "/";
      console.log(999999);
    } else {
      console.log(res);
      alert("Something went wrong!");
    }
  };

  let datas = {
    user: user,
    login: login,
    logout: logout,
  };
  return (
    <>
      <Conte.Provider value={datas}>
        <Router>
          <Nav />
          <Routes>
            <Route exact element={<Todo />} path="/todo" />
            <Route exact element={<Home />} path="/" />
            <Route exact element={<Register />} path="/register" />
            <Route exact element={<Login />} path="/login" />
          </Routes>
        </Router>
      </Conte.Provider>
    </>
  );
}

export default App;
