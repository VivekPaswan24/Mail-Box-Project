import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { mailActions } from "../../store/mail-slice";
import { uiActions } from "../../store/ui-slice";

import axios from "axios";


const ComposeMail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const emailInputRef = useRef();
  const subjectRef = useRef();

  const dispatch = useDispatch();

  const editorHandler = (editorState) => {
    setEditorState(editorState);
  };

  const mailSubmitHandler = async(event) => {
    event.preventDefault();
    const mail = {
      from: localStorage.getItem("email"),
      to: emailInputRef.current.value,
      subject: subjectRef.current.value,
      message: editorState.getCurrentContent().getPlainText(),
    };
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Please Wait..Sending data.",
      })
    );
    try {
      const response=await axios.post(
        "https://mail-box-project-c3098-default-rtdb.firebaseio.com/mail.json",
        { mail }
      );
      console.log(response)
      dispatch(mailActions.sentBox({...mail,id:response.data.name}));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Successfully send data.",
        })
      );
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
    setTimeout(() => {
      dispatch(uiActions.closeNotification());
    }, 3000);

  };
  return (
    <Container
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "5vh",
        minHeight: "80vh",
        borderRadius: "8px",
      }}
    >
      <Form onSubmit={mailSubmitHandler}>
        <div className="d-flex justify-content-between mb-3">
          <h2>ComposeMail</h2>
          <Button type="submit" variant="success">
            SendMail
          </Button>
        </div>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1">
            To
          </Form.Label>
          <Col sm="11">
            <Form.Control
              type="email"
              placeholder="name@gmail.com"
              ref={emailInputRef}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1">
            Subject
          </Form.Label>
          <Col sm="11">
            <Form.Control type="text" placeholder="Subject" ref={subjectRef} />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label column sm="1">
            Message
          </Form.Label>
          <Col sm="11">
            <Editor
              editorState={editorState}
              onEditorStateChange={editorHandler}
            />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ComposeMail;
