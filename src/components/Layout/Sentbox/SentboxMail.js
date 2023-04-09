import { Col, Row } from "react-bootstrap";

const SentboxMail=(props)=>{
    return <Row>
        <Col sm='1'>
        {props.isRead && <p>&#128309;</p> }
        </Col>
        <Col am='3'>
        <p>{props.to}</p>
        </Col>
        <Col am='8'>
        <p>{props.subject}</p>
        </Col>
    </Row>
};

export default SentboxMail;