import { Container, Stack, Button, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  const inbox=useSelector(state=>state.mail.inBox)

  const totalNumberOfUnreadMessage=inbox.reduce((currNumber,ele)=>{
    if(ele.firstTime===true){
     currNumber=currNumber+1
    }
    return currNumber
  },0)

  return (
    <Container fluid className="min-vh-100 bg-light w-25 ms-0">
      <Stack gap={3}>
        <Container className=" mt-3 d-flex justify-content-center">
          <Button style={{ borderRadius: "0px", width: "90em" }}>
            <NavLink to='/home' style={{color:'white',textDecoration:'none'}}>Compose Mail</NavLink>
          </Button>
        </Container>
        <Container className="d-flex justify-content-center">
            <NavLink to="/home/inbox" style={{color:'black',textDecoration:'none',fontSize:'1.3rem'}}>Inbox</NavLink> <Badge bg="info">{totalNumberOfUnreadMessage} Unread</Badge>
        </Container>
        <Container className="d-flex justify-content-center">
           <NavLink to="/home/sentbox" style={{color:'black',textDecoration:'none',fontSize:'1.3rem'}}>Sent</NavLink>  <Badge bg="info">0</Badge>
        </Container>
      </Stack>
    </Container>
  );
};

export default SideBar;
