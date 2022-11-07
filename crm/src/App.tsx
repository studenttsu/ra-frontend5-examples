import { useEffect } from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import './App.css';

import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuth, logout, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      {isAuth && (
        <header>
          <nav>
            <ul>
              <li><Link to="/">Записи</Link></li>
              <li><Link to="/employees?name=dawsdqwd&phone=8213771283">Сотрудники</Link></li>
            </ul>
          </nav>

          <button onClick={logout}>Logout</button>
        </header>
      )}

      <Outlet />
    </div>
  );
}

export default App;
