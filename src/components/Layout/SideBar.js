import { Container, Stack, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const SideBar = () => {

    const dispatch=useDispatch();

    const showComposeHandler=()=>{
        dispatch(uiActions.showCompose());
    }
    const showInboxHandler=()=>{
        dispatch(uiActions.showInbox())
    }
  return (
    <Container fluid className="min-vh-100 bg-light w-25 ms-0">
      <Stack gap={3}>
        <Container className=" mt-3 d-flex justify-content-center">
          <Button style={{ borderRadius: "0px", width: "90em" }} onClick={showComposeHandler}>
            Compose
          </Button>
        </Container>
        <Container className="d-flex justify-content-center">
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "1.5em",
            }}
            onClick={showInboxHandler}
          >
            Inbox <Badge bg="info">0</Badge>
          </button>
        </Container>
        <Container className="d-flex justify-content-center">
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "1.5em",
            }}
          >
            Sent <Badge bg="info">0</Badge>
          </button>
        </Container>
      </Stack>
    </Container>
  );
};

export default SideBar;
