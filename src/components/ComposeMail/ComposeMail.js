import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addData, } from "../../store/mail-slice";


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
    const senderMail=localStorage.getItem('email');
    const receiverMail=emailInputRef.current.value
    const mail = {
      from: senderMail,
      to: receiverMail,
      subject: subjectRef.current.value,
      message: editorState.getCurrentContent().getPlainText(),
      firstTime:true
    };
    dispatch(addData(mail))
  };
  return (
    <Container
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "5vh",
        minHeight: "100vh",
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
