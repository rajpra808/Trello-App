import React, { useState, useEffect } from "react";
import { Form, Button, Navbar, Nav } from "react-bootstrap";
import AuthService from "../../services/auth.services";
import { useHistory } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const history = useHistory();

  const navigate = async () => {
    const authorized = await AuthService.isLoggedIn();
    if (authorized) {
      history.push("/dashboard");
    }
  };

  useEffect(() => {
    navigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validateForm() {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(mailformat))
    {
      return email.length > 5 && password.length > 5;
    }
    else
    {
      return false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    // setLoading(true);

    AuthService.login(email, password).then(
      () => {
        history.push("/dashboard");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          console.log(resMessage);
        // setLoading(false);
        // setError(resMessage);
      }
    );
  }

  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/dashboard">Trello Clone</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/login">LogIn</Nav.Link>
              <Nav.Link href="/signup">SignUp</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="Login Login-header App">
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Form>
      </div>
    </div>
  );
}