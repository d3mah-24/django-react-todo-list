/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
const Register = () => {
  const create = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://127.0.0.1:8000/api/todos/`, {
        first_name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        alert("Account Created Successfully");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("Something went wrong!");
      });
  };
  return (
    <>
      <Form className="form form-control" method="POST" onSubmit={create}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="username" type="text" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password </Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;
