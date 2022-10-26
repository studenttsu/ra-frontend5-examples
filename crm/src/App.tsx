import React, { useMemo } from 'react';
import './App.css';

import { EmployeeCard } from './components/EmployeeCard';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuth, login, logout } = useAuth();

  const employees = useMemo<any[]>(() => {
    return [
      {
        id: 1,
        photo: 'https://i.pinimg.com/736x/f8/c8/1d/f8c81d920fb1d9756b766300c9bbc78e.jpg',
        name: 'Анжела',
        position: 'Маникюрщица'
      }
    ];
  }, []);

  return (
    <div style={{ display: 'flex', gap: 30 }}>
      {isAuth && (
        <header>
          <button onClick={logout}>Logout</button>
        </header>
      )}

      {isAuth ? (
        (
          employees.map(employee => 
            <EmployeeCard key={employee.id} employee={employee} onInfoMain={() => console.log('OnInfo')} />
          )
        )
      ) : <AuthForm onLogin={login} />}
    </div>
  );
}

export default App;
