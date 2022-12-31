import { Link } from "react-router-dom";
import { useContext } from "react";
import { Conte } from "../App";
export const Nav = () => {
  let { user, logout } = useContext(Conte);
  // console.log(user);
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Todo List
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <button onClick={logout} className="btn btn-primary me-3">
                Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-primary me-3" to="/register">
                  Register
                </Link>
                <Link className="btn btn-primary me-3" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
