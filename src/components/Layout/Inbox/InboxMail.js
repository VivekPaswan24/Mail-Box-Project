import axios from "axios";
import React from "react";
import { Row, Col,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link,} from "react-router-dom";
import { deleteMail, mailActions } from "../../../store/mail-slice";

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

  const deleteMailHandler=()=>{
    dispatch(deleteMail(props.id))
  }

  return (
    <div className="border-bottom">
      <Link to={`/home/inbox/${props.id}`} style={{textDecoration:'none',color:'black'}}>
      <Row style={{cursor:'pointer'}} >
        <Col sm='1'>
            {props.isRead && <p>&#128309;</p>}
        </Col>
        <Col sm="4" onClick={showFullMessageHandler}>
          <div className="d-flex">
            <p>{props.from}</p>
          </div>
        </Col>
        <Col sm="5">
          <p>{props.subject}</p>
        </Col>
        <Col sm='2'>
        </Col>
      </Row>
      </Link>
        <Button variant='outline-danger' onClick={deleteMailHandler}>Delete Mail</Button>
    </div>
  );
};

export default InboxMail;
