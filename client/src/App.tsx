import { Outlet, Link } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/recipe-book">Recipe Book</Link></li>
          <li><Link to="/recipe-maker">Recipe Maker</Link></li>
          <li><Link to="/user-info">User Info</Link></li>
        </ul>
      </nav>
      {/* This Outlet is essential for nested routes to be displayed */}
      <Outlet />
    </div>
  );
}

export default App;