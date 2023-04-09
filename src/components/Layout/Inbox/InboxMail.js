import axios from "axios";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link,} from "react-router-dom";
import { mailActions } from "../../../store/mail-slice";

const InboxMail = (props) => {

  const dispatch=useDispatch()

  const inbox=useSelector(state=>state.mail.inBox)
  console.log(inbox,'inbox')

  const showFullMessageHandler=async()=>{
    const email=localStorage.getItem('email').replace('@','').replace('.','');
    let updatedMail;
    for(const key in inbox){
      if(inbox[key].id===props.id){
        updatedMail=inbox[key]
        console.log(inbox[key],'inbo')
      }
    }
    const mail={...updatedMail,firstTime:false}
    console.log(mail)
    try{
      await axios.put(`https://mail-box-project-c3098-default-rtdb.firebaseio.com/${email}/${props.id}.json`,{mail})
      dispatch(mailActions.updateInbox(mail))
      console.log("success")
    }catch(error){
      console.log(error)
    }
    console.log('clicked')
  }
  return (
    <div className="border-bottom">
      <Link to={`/home/inbox/${props.id}`} style={{textDecoration:'none',color:'black'}}>
      <Row style={{cursor:'pointer'}} onClick={showFullMessageHandler}>
        <Col sm="4">
          <div className="d-flex">
            {props.isRead && <p>&#128309;</p>}
            <p>{props.from}</p>
          </div>
        </Col>
        <Col sm="8">
          <p>{props.subject}</p>
        </Col>
      </Row>
      </Link>
    </div>
  );
};

export default InboxMail;
