import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChangeEmail } from '../../components/ChangeDataUser/ChangeEmail/ChangeEmail';
import { ChangePassword } from '../../components/ChangeDataUser/ChangePassword/ChangePassword';
import { FoundJob } from '../../components/ChangeDataUser/FoundJob/FoundJob';
import { Header } from '../../components/Header/Header';
import { NavbarStudents } from '../../components/NavbarStudents/NavbarStudents';

export const UserView = () => {

    const data =[['Edytuj CV','/user/edit'],['Zmień hasło','/user/password'],['Zmień e-mail','/user/email'],['Znalazłem prace','/user/job']];

    return (
        <>
            <Header/>
            <div className="page-wrapper">
                <div className="main-wrapper">
                    <NavbarStudents data={data}/>
                    <div className="list-wrapper">
                        <Routes>
                            <Route path="/edit" element={<ChangePassword />}/>
                            <Route path="/password" element={<ChangePassword />}/>
                            <Route path="/email" element={<ChangeEmail />}/>
                            <Route path="/job" element={<FoundJob />}/>
                        </Routes>

                    </div>
                </div>
            </div>
        </>
    )
}