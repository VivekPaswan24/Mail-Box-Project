import { Outlet } from "react-router-dom";
import MainNavigation from "../components/Header/MainNavigation";
import Notification from "../components/UI/Notification";

import { useSelector } from "react-redux";

const RootLayout = () => {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
