import React from "react";
import { StaffDto } from "../../../api/EmployeesApi";

interface EmployeeCardProps {
    employee: StaffDto;
    onInfoMain: () => void;
}

export function EmployeeCard(props: EmployeeCardProps) {
    const { photo, fullName, position } = props.employee;

    const handleClick = () => {
        console.log('handle click');

        if (props.onInfoMain) {
            props.onInfoMain();
        }
    };

    return (
        <div className="employee-card">
            <div className="employee-card__photo">
                <img
                    style={{
                        height: 200,
                        width: 'auto'
                    }}
                src={photo} alt="" />
            </div>

            <div className="employee-card__name">{fullName}</div>
            <p className="employee-card__position">{position}</p>
            <button onClick={handleClick}>Подробнее</button>
        </div>
    );
}