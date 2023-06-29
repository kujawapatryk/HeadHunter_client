import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { AddHr } from './components/AddHr/AddHr';
import { Admin } from './components/Admin/Admin';
import { AuthWrapper } from './components/Auth/AuthWrapper';
import { Login } from './components/Login/Login';
import { NewPassword } from './components/NewPassword/NewPassword';
import { PasswordReminder } from './components/PasswordReminder/PasswordReminder';
import { SendStudentsData } from './components/SendStudentsData/SendStudentsData';
import { TestToken } from './components/TestToken/TestToken';
import { UserChange } from './components/UserChange/UserChange';
import { CVEdit } from './views/CVEdit/CVEdit';
import { CVView } from './views/CVView/CVView';
import { ListView } from './views/ListView/ListView';
import { UserView } from './views/UserView/UserView';

import './index.scss';

export const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(true); //do zmiany w momencie przekazywania wartości z backend

    return (
        <>
            <UserChange />
            <SnackbarProvider maxSnack={5}>
                <Routes>
                    <Route path="/new-password/:token/:userId" element={<NewPassword />} />
                    <Route path="/password-reset" element={<PasswordReminder />}/>
                    <Route path="/addhr" element={<AddHr />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/send-student" element={<SendStudentsData />} />
                    <Route path="/cv/:studentId" element={<CVView />} />
                    <Route path="/log/:token" element={<TestToken />} />
                    <Route path="/user/*" element={<UserView />} />
                    <Route>
                        <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
                    </Route>
                    <Route path="/" element={<AuthWrapper isLoggedIn={isLoggedIn} />}>
                        <Route path="/list/*" element={<ListView />} />
                        <Route path="/edit" element={<CVEdit />} />
                    </Route>

                </Routes>
            </SnackbarProvider>
        </>
    );
};
