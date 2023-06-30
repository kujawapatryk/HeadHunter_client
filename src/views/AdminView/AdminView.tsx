import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AddHr } from '../../components/AddHr/AddHr';
import { ChangeEmail } from '../../components/ChangeDataUser/ChangeEmail/ChangeEmail';
import { ChangePassword } from '../../components/ChangeDataUser/ChangePassword/ChangePassword';
import { Header } from '../../components/Header/Header';
import { NavbarStudents } from '../../components/NavbarStudents/NavbarStudents';
import { SendStudentsData } from '../../components/SendStudentsData/SendStudentsData';

import '../../index.scss';
import './AdminView.scss';

export const AdminView = () => {

    const admin = [['Dodaj HR','/admin/add-hr'],['Dodaj Kursantów','/admin/add-students'],['Zmień hasło','/admin/password'],['Zmień e-mail','/admin/email']];

    return (
        <>
            <Header/>
            <div className="page-background__admin-view">

                <div className="main-wrapper__admin-view">
                    <NavbarStudents data={admin} />
                    <div className="admin-view-wrapper">
                        <Routes>
                            <Route path="/add-hr" element={<AddHr />}/>
                            <Route path="/add-students" element={<SendStudentsData />}/>
                            <Route path="/password" element={<ChangePassword />}/>
                            <Route path="/email" element={<ChangeEmail />}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};
