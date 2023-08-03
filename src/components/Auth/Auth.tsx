import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { API_URL } from '../../config/apiUrl';
import { setLocalStorageLogin } from '../../utils/setLocalStorageLogin';

interface Props {
    children: React.ReactNode,
    roles: number[],
}
export const Auth = ({ children, roles }: Props) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage['isLoggedIn'];

    if(isLoggedIn){
        const permission = Number(localStorage['permission']);
        console.log(permission)
        console.log(roles)
        console.log(roles.includes(permission))
        if( roles.includes(permission)) {
            return <>
                {children}
            </>
        }else{
            // snackbar('unAuthorized');
            return <Navigate to="/" />;
        }

    }else{

        useEffect( () => {
            (async () => {
                const res = await fetch(`${API_URL}/auth/extra-login-data`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                setLocalStorageLogin(data, navigate);
                if(res.status === 200) {
                    return <>
                        {children}
                    </>
                }else{
                    return <Navigate to="/" />;
                }
            })();
        },[])

    }
    // snackbar('tryLater');
    console.log('pierdolisz')
    return <Navigate to="/" />;
};