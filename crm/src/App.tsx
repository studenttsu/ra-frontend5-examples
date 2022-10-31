import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import './App.css';

import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuth, logout } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isAuth && (
        <header>
          <nav>
            <ul className="navigation">
              <li className={location.pathname === '/' ? 'active' : undefined}><Link to="/">Записи</Link></li>
              <li className={location.pathname === '/employees' ? 'active' : undefined}><Link to="/employees">Сотрудники</Link></li>
            </ul>
          </nav>

          <button onClick={logout}>Logout</button>
        </header>
      )}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
