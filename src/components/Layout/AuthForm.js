import axios from "axios";

import { useRef } from "react";

import { Card, Form, FloatingLabel, Container, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const AuthForm = () => {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passRef = useRef();
  const confRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passRef.current.value;
    const enteredConfPassword = confRef.current.value;
    if (enteredPassword === enteredConfPassword) {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Please wait...",
          message: "Creating an account",
        })
      );
      try {
        await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKm6F7BwSujkQy2tLaY0UIZl3IEW35jII",
          {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }
        );
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Successfully created an account",
          })
        );
        console.log("User has successfully signed up");
      } catch (error) {
        console.log(error);
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failed!",
            message: error.response.data.error.message,
          })
        );
      }
    } else {
      alert("Password is not match");
    }
    setTimeout(() => {
      dispatch(uiActions.closeNotification());
    }, 3000);
  };
  return (
    <Container className="d-flex justify-content-center">
      <Card
        style={{
          width: "23rem",
          backgroundColor: "transparent",
          border: "none",
          marginTop: "15vh",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center text-light fw-bolder mb-3">
            SignUp
          </Card.Title>
          <Form onSubmit={submitHandler}>
            <FloatingLabel label="Email address" className="mb-3">
              <Form.Control
                size="lg"
                type="email"
                placeholder="name@example.com"
                className="rounded-pill"
                required
                ref={emailRef}
              />
            </FloatingLabel>
            <FloatingLabel label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="rounded-pill"
                required
                ref={passRef}
              />
            </FloatingLabel>
            <FloatingLabel label="Confirm Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="rounded-pill"
                required
                ref={confRef}
              />
            </FloatingLabel>
            <div className="d-grid gap-2">
              <Button
                variant="outline-info"
                size="lg"
                className="rounded-pill"
                type="submit"
              >
                SignUp
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthForm;
