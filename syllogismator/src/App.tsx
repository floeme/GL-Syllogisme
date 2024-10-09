import Navigation from './components/elements/Navigation';
import './styles/pages/_app.scss'

import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="app-container">
      <nav className="navbar">
        <Navigation/>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default App