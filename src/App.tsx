import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { UserState } from 'types';

import { Auth } from './components/Auth/Auth';
import { Login } from './components/Login/Login';
import { NewPassword } from './components/NewPassword/NewPassword';
import { PasswordReminder } from './components/PasswordReminder/PasswordReminder';
import { TestToken } from './components/TestToken/TestToken';
import { UserChange } from './components/UserChange/UserChange';
import { AdminView } from './views/AdminView/AdminView';
import { CVView } from './views/CVView/CVView';
import { ListView } from './views/ListView/ListView';
import { UserView } from './views/UserView/UserView';

import './index.scss';

export const App = () => {

    return (
        <>
            <UserChange />
            <SnackbarProvider maxSnack={5}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/new-password/:token/:userId" element={<NewPassword />} />
                    <Route path="/password-reset" element={<PasswordReminder />}/>
                    <Route path="/log/:token" element={<TestToken />} />

                    <Route path="/user/*" element={<UserView />} />

                    <Route path="/admin/*" element={<Auth roles={[UserState.admin]}> <AdminView /> </Auth>} />

                    <Route path="/list/*" element={<Auth roles={[UserState.hr]} > <ListView /> </Auth>} />
                    <Route path="/cv/:studentId" element={<Auth roles={[UserState.hr]} > <CVView /> </Auth>} />

                </Routes>
            </SnackbarProvider>
        </>
    );
};
