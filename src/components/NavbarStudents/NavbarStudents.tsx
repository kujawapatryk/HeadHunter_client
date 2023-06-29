import React, { KeyboardEvent, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PaginationContext } from '../../contexts/pagination.context';

import './NavbarStudents.scss'

export const NavbarStudents = (props:{ data : string[][] }) => {
    const { pagination, setPagination } = useContext(PaginationContext);

    const navigate = useNavigate();
    const location = useLocation();

    const { data } = props;
    let locationIndex;
    for (let i = 0; i < data.length; i++) {
        const array = data[i];
        const index = array.indexOf(location.pathname);

        if (index !== -1) {
            locationIndex = i;
            break;
        }
    }

    const [activeCategory, setActiveCategory] = useState(locationIndex);

    const handleClick = (navi: string, index: number) => {
        setActiveCategory(index);
        setPagination({
            ...pagination,
            page: 0,
        });
        navigate(navi);

    };

    const handleKeyPress = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
            setActiveCategory(index);
        }
    };

    return (
        <div className="navbar-wrapper">
            <ul className="students-availability">

                {data.map((item, index) => (
                    <li key={index}>
                        <button className={activeCategory === index ? 'active' : ''}
                            onClick={() => handleClick(data[index][1],index)}
                            onKeyDown={(event) => handleKeyPress(event, index)}
                            // aria-pressed={activeCategory === 'forInterview'}
                        >
                            {data[index][0]}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}