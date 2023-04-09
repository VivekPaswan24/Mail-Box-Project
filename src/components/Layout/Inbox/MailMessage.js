import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MailMessage=()=>{
    const params=useParams()
    const inbox=useSelector(state=>state.mail.inBox)
    let mail;
    for(const key in inbox){
        if(inbox[key].id===params.mailId){
            mail=inbox[key]
        }
    }
    return <Container style={{minHeight:'100vh',minWidth:'80vw',backgroundColor:'white',color:'black'}}>
        <h1>Message</h1>
        <p>From:- {mail.from}</p>
        <p>Subject:-{mail.subject}</p>
        <p>Message:-{mail.message}</p>
    </Container>
};

export default MailMessage;