import { Col, Row, Container } from "react-bootstrap";
import InboxMail from "./InboxMail";
import { useSelector } from "react-redux";
const Inbox = () => {

  const inbox=useSelector(state=>state.mail.inBox)
  return (
    <Container style={{ backgroundColor: "white", color: "black",minHeight:'100vh',minWidth:'75vw' }}>
      <Row>
        <Col sm='1'>
        
        </Col>
        <Col sm="4">
          <h3>From</h3>
        </Col>
        <Col sm="5">
          <h3>Subject</h3>
        </Col>
        <Col sm='2'>
        </Col>
      </Row>
      <hr/>
      {inbox.map((ele)=><InboxMail key={ele.id} id={ele.id} from={ele.from} subject={ele.subject} isRead={ele.firstTime} />)}
    </Container>
  );
};

export default Inbox;

