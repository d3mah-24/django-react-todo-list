import axios from "axios";
import { useEffect, useState, useContext } from "react";
// import jwt_decode from "jwt-decode";
import {
  faEdit,
  faTrashCan,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Conte } from "../App";

const Todo = () => {
  let { user } = useContext(Conte);

  // let dat = jwt_decode(user.access);
  // console.log(dat, 2222);
  const [post, setpost] = useState([]);
  const [txt, settxt] = useState("");
  const [etxt, setetxt] = useState("");
  const [edit, setedit] = useState(0);
  const [load, setload] = useState(false);
  async function updatePost(txt, idd) {
    setload(true);
    await axios
      .put(`http://127.0.0.1:8000/api/${idd}/`, {
        content: txt,
        user: 1,
      })
      .then((response) => {
        // console.log(response.data);
        setpost(
          post.map((p) => {
            if (p.id === idd) {
              return { ...p, content: txt };
            } else {
              return p;
            }
          })
        );
        setedit(0);
        setetxt("");
      })
      .catch((error) => {
        alert("Something went wrong!");
      });
    setload(false);
  }
  async function deletePost(idd) {
    setload(true);
    await axios
      .delete(`http://127.0.0.1:8000/api/${idd}/`)
      .then(() => {
        setpost(post.filter((t) => t.id !== idd));
      })
      .catch((error) => {
        alert("Something went wrong!");
      });
    setload(false);
  }

  async function createPost() {
    setload(true);
    // console.log(dat, 2222);
    await axios
      .post("http://127.0.0.1:8000/api/", {
        content: txt,
        user: user.user_id,
      })
      .then((response) => {
        // console.log(response.data);
        setpost([...post, response.data]);
        settxt("");
      })
      .catch((error) => {
        alert("Something went wrong!");
      });
    setload(false);
  }

  useEffect(() => {
    async function cc() {
      setload(true);
      await axios
        .get(`http://127.0.0.1:8000/api/todos/${user.user_id}/`)
        .then((response) => {
          setpost(response.data);
        })
        .catch((error) => {
          alert("Something went wrong!");
        });
      setload(false);
    }
    cc();
  }, []);
  return (
    <>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-12">
              <div className="card card-body">
                <h4 className="card-title">
                  {user.name.toUpperCase()} Todo list
                </h4>
                <div className="add-items d-flex">
                  <input
                    type="text"
                    value={txt}
                    className="form-control todo-list-input"
                    placeholder="What do you need to do today?"
                    onChange={(e) => settxt(e.target.value)}
                  />
                  <button
                    onClick={createPost}
                    className="add btn btn-primary font-weight-bold todo-list-add-btn"
                  >
                    Add
                  </button>
                </div>
                <div className="list-wrapper">
                  <ul className="d-flex flex-column-reverse todo-list">
                    {post.length > 0 ? (
                      load ? (
                        <h2>Loading...</h2>
                      ) : (
                        post.map((p) => (
                          <li id={p.id}>
                            {p.id !== edit ? (
                              <>
                                <div className="form-checkss ">
                                  <label className="form-check-label">
                                    {p.content}
                                    <i className="input-helper"></i>
                                  </label>
                                </div>
                                <div className="rightchild">
                                  <FontAwesomeIcon
                                    onClick={() => {
                                      setedit(p.id);
                                      setetxt(p.content);
                                    }}
                                    icon={faEdit}
                                  />
                                  <FontAwesomeIcon
                                    onClick={() => {
                                      deletePost(p.id);
                                    }}
                                    icon={faTrashCan}
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="form-checkss completed">
                                  <label className="form-check-label">
                                    <input
                                      type="text"
                                      value={etxt}
                                      onChange={(e) => setetxt(e.target.value)}
                                    />
                                  </label>
                                </div>
                                <FontAwesomeIcon
                                  size="lg"
                                  onClick={() => {
                                    updatePost(etxt, p.id);
                                  }}
                                  icon={faCircleCheck}
                                />
                              </>
                            )}
                          </li>
                        ))
                      )
                    ) : (
                      <h2>No Todo List </h2>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
