import React from 'react';
import './App.css';
import { EmployeeCard } from './components/EmployeeCard';

const employees = [
  {
    id: 1,
    photo: 'https://i.pinimg.com/736x/f8/c8/1d/f8c81d920fb1d9756b766300c9bbc78e.jpg',
    name: 'Анжела',
    position: 'Маникюрщица'
  }
];

function App() {
  return (
    <div style={{ display: 'flex', gap: 30 }}>
      {employees.map(employee => <EmployeeCard key={employee.id} employee={employee} onInfoMain={() => console.log('OnInfo')} />)}
    </div>
  );
}

export default App;
