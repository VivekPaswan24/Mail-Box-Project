import { useSelector } from 'react-redux';
import './App.css';
import MainNavigation from './components/Header/MainNavigation';
import AuthForm from './components/Layout/AuthForm';
import Notification from './components/UI/Notification';

function App() {
  const notification=useSelector(state=>state.ui.notification);
  return (
    <div className="App">
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <MainNavigation/>
      <AuthForm/>
    </div>
  );
}

export default App;
