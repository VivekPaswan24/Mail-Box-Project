import { Col, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import InboxMail from "./InboxMail";

const Inbox = () => {
  const inbox = useSelector((state) => state.mail.inbox);
  const sentbox = useSelector((state) => state.mail.sentbox);
  console.log(sentbox)
  console.log('inbox',inbox)
  return (
    <Container style={{ backgroundColor: "white", color: "black" }}>
      <Row>
        <Col sm="4">
          <h3>From</h3>
        </Col>
        <Col sm="8">
          <h3>Subject</h3>
        </Col>
      </Row>
      <hr/>
      {inbox.map((ele)=><InboxMail key={ele.id} from={ele.from} subject={ele.subject} />)}
    </Container>
  );
};

export default Inbox;
