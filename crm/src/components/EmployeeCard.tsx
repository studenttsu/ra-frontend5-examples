import React from "react";
interface EmployeeCardProps {
    employee: any;
    onInfoMain: () => void;
}

export function EmployeeCard(props: EmployeeCardProps) {
    const { photo, name, position } = props.employee;

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

            <div className="employee-card__name">{name}</div>
            <p className="employee-card__position">{position}</p>
            <button onClick={handleClick}>Подробнее</button>
        </div>
    );
}