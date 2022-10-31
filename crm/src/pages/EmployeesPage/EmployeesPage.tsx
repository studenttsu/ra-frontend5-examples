import { useMemo } from 'react';
import { EmployeeCard } from '../../components/EmployeeCard';

export function EmployeesPage() {
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
        <>
            <h1>Сотрудники</h1>

            {employees.map(employee => 
                <EmployeeCard key={employee.id} employee={employee} onInfoMain={() => console.log('OnInfo')} />
            )}
        </>
    );
}