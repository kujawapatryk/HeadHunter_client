import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChangeEmail } from '../../components/ChangeDataUser/ChangeEmail/ChangeEmail';
import { ChangePassword } from '../../components/ChangeDataUser/ChangePassword/ChangePassword';
import { FoundJob } from '../../components/ChangeDataUser/FoundJob/FoundJob';
import { CVEdit } from '../../components/CVEdit/CVEdit';
import { Header } from '../../components/Header/Header';
import { NavbarStudents } from '../../components/NavbarStudents/NavbarStudents';
import { snackbar } from '../../utils/snackbar';

import './UserView.scss';
import '../../index.scss';

export const UserView = () => {
    let data=[];
    const permission = Number(localStorage.getItem('permission'));
    const hr = [['Zmień hasło','/user/password'],['Zmień e-mail','/user/email'],['Wróć do przeglądania studentów','/list']];
    const student =[['Edytuj CV','/user/edit'],['Zmień hasło','/user/password'],['Zmień e-mail','/user/email'],['Znalazłem prace','/user/job']];
    if(permission === 2){
        data = hr;
    }else if(permission === 3){
        data = student;
    }else{
        snackbar('unAuthorized')
        return null;
    }

    return (
        <>
            {data && (
                <>
                    <Header />
                    <div className="page-background__user-view">
                        <div className="main-wrapper__user-view">
                            <NavbarStudents data={data} />
                            <div className="user-view-wrapper">
                                <Routes>
                                    <Route path="/edit" element={<CVEdit />}/>
                                    <Route path="/password" element={<ChangePassword />}/>
                                    <Route path="/email" element={<ChangeEmail />}/>
                                    <Route path="/job" element={<FoundJob />}/>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}