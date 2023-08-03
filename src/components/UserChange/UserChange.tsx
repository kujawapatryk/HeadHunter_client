import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { UserState } from 'types';

import { API_URL } from '../../config/apiUrl';
import { setLocalStorageLogin } from '../../utils/setLocalStorageLogin';
import { snackbar } from '../../utils/snackbar';

import './UserChange.scss';

type Users = {
    email?: string,
    password?: string,
}[];

export const UserChange = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [mouseOffsetX, setMouseOffsetX] = useState(0);
    const [mouseOffsetY, setMouseOffsetY] = useState(0);
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();

    const users: Users = [{},{
        email: 'wojtek@wp.pl',
        password: 'Test123@',
    },{
        email: 'ania@wp.pl',
        password: 'Test123@',
    },{
        email: 'lorem@wp.pl',
        password: 'Test123@',
    }]

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

    const changeTo = async (user: number) => {

        const { email, password } = users[user];
        setSpinner(true);
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                setLocalStorageLogin(data, navigate);
            } else {
                snackbar(data.message);

            }
        } catch (error) {
            console.error(error);
            snackbar('errorLogin');
        } finally {
            setSpinner(false);
        }
    };

    return (
        <button
            id="myWindow"
            className="window"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >

            <button className="user-change___btm" onClick={() => changeTo(UserState.admin)}>Administrator</button>
            <button className="user-change___btm" onClick={() => changeTo(UserState.hr)}>HR</button>
            <button className="user-change___btm" onClick={() => changeTo(UserState.student)}>Student</button>

            <CircularProgress style={{ display: spinner ? '' : 'none' }}/>
        </button>

    )
};