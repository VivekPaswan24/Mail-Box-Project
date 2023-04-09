import { Container,Row,Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import SentboxMail from "./SentboxMail";
const Sentbox=()=>{

    const sentbox=useSelector(state=>state.mail.sentBox);

    return <Container style={{backgroundColor:'white',color:'black',minHeight:'100vh',minWidth:'75vw'}}>
        <Row>
            <Col sm='1'>
            </Col>
            <Col sm='3'>
                <h3>To</h3>
            </Col>
            <Col sm='8'>
                <h3>Subject</h3>
            </Col>
        </Row>
        {sentbox.map((ele)=><SentboxMail key={ele.id} to={ele.to} subject={ele.subject} isRead={ele.firstTime} id={ele.id} />)}
    </Container>
};

export default Sentbox;