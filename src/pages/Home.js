import SideBar from "../components/Layout/SideBar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <Container fluid className="d-flex justify-content-between">
      <SideBar />
      <main>
        <Outlet/>
      </main>
    </Container>
  );
};

export default HomeLayout;
