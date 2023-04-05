import React from "react";
import { Row, Col } from "react-bootstrap";

const InboxMail = (props) => {
  return (
    <div className="border-bottom">
      <Row>
        <Col sm="4">
          <p>{props.from}</p>
        </Col>
        <Col sm="8">
          <p>{props.subject}</p>
        </Col>
      </Row>
    </div>
  );
};

export default InboxMail;
