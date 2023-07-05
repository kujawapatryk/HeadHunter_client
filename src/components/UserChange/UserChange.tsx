import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './UserChange.scss';

export const UserChange = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [mouseOffsetX, setMouseOffsetX] = useState(0);
    const [mouseOffsetY, setMouseOffsetY] = useState(0);
    const navigate = useNavigate();

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsDragging(true);
        setMouseOffsetX(event.clientX - event.currentTarget.offsetLeft);
        setMouseOffsetY(event.clientY - event.currentTarget.offsetTop);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isDragging) {
            const windowElement = document.getElementById('myWindow');
            if (windowElement) {
                windowElement.style.left = event.clientX - mouseOffsetX + 'px';
                windowElement.style.top = event.clientY - mouseOffsetY + 'px';
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const changeToAdmin = () =>{
        localStorage.setItem('userid','5a06c091-e1d7-11ed-b007-24fd5235b3db');

        // localStorage.setItem('userid','46f84261-df9d-11ed-a2b7-24fd5235b3db');

        localStorage.setItem('permission','1');
        localStorage.setItem('megakname','Administrator');
        navigate('/admin/employed');
    };

    const changeToStudent = () =>{
        localStorage.setItem('userid','b7f1cb85-e54a-11ed-86df-24fd5235b3db');
        localStorage.setItem('permission','3');
        localStorage.setItem('megakname', 'Wojciech Wojciechowski');
        localStorage.setItem('gitname', 'kujawapatryk');
        navigate('/user/edit');
    };

    const changeToHR = () =>{
        localStorage.setItem('permission','2');
        localStorage.setItem('userid','46f84261-df9d-11ed-a2b7-24fd5235b3db');
        localStorage.setItem('megakname', 'Jacek Malinowski');
        navigate('/list');
    };

    return (
        <button
            id="myWindow"
            className="window"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >

            <button className="user-change___btm" onClick={changeToAdmin}>Administrator</button>
            <button className="user-change___btm" onClick={changeToStudent}>Student</button>
            <button className="user-change___btm" onClick={changeToHR}>HR</button>
        </button>

    )
};