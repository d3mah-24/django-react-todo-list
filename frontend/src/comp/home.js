// import axios from "axios";
// import { useEffect, useState } from "react";

// import { useContext } from "react";
// import { Conte } from "../App";
import Todo from "./todo";

export const Home = () => {
  // const { dat } = useContext(Conte);
  return (
    <>
      {localStorage.getItem("authTokens") ? (
        <Todo />
      ) : (
        <>
          <h2> </h2>
          <h2>Your're Not Logged In </h2>
        </>
      )}
    </>
  );
};
