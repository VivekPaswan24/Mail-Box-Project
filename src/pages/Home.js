import SideBar from "../components/Layout/SideBar";
import ComposeMail from "../components/ComposeMail/ComposeMail";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Inbox from "../components/Layout/Inbox/Inbox.js";

const HomePage = () => {
  const ui=useSelector(state=>state.ui)
  return (
    <Container fluid className="d-flex justify-content-between">
      <SideBar />
      {ui.showCompose && <ComposeMail/>}
      {ui.showInbox && <Inbox/>}
    </Container>
  );
};

export default HomePage;
