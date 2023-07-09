import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { EmployedStudents } from '../../components/ EmployedStudents/EmployedStudents';
import { AddHr } from '../../components/AddHr/AddHr';
import { ChangeEmail } from '../../components/ChangeDataUser/ChangeEmail/ChangeEmail';
import { ChangePassword } from '../../components/ChangeDataUser/ChangePassword/ChangePassword';
import { Header } from '../../components/Header/Header';
import { NavbarStudents } from '../../components/NavbarStudents/NavbarStudents';
import { Pagination } from '../../components/Pagination/Pagination';
import { SendStudentsData } from '../../components/SendStudentsData/SendStudentsData';
import { PaginationContext } from '../../contexts/pagination.context';

import './AdminView.scss';

export const AdminView = () => {
    const [pagination,setPagination] = useState({ page: 0, rowsPerPage: 10, allRecords: 0 } );
    const location = useLocation();
    console.log(location);
    const isEmployedPath = location.pathname === '/admin/employed';

    const admin = [['Zatrudnieni studenci','employed'],['Dodaj HR','/admin/add-hr'],['Dodaj Kursantów','/admin/add-students'],['Zmień hasło','/admin/password'],['Zmień e-mail','/admin/email']];

    return (
        <>
            <PaginationContext.Provider value={{ pagination, setPagination }}>
                <Header/>
                <div className="page-background__admin-view">
                    <div className="main-wrapper__admin-view">
                        <NavbarStudents data={admin} />
                        <div className="admin-view-wrapper">
                            <Routes>

                                <Route path="/employed" element={<EmployedStudents />}/>
                                <Route path="/add-hr" element={<AddHr />}/>
                                <Route path="/add-students" element={<SendStudentsData />}/>
                                <Route path="/password" element={<ChangePassword />}/>
                                <Route path="/email" element={<ChangeEmail />}/>
                            </Routes>
                        </div>
                    </div>
                    {isEmployedPath && <Pagination />}
                </div>
            </PaginationContext.Provider>
        </>
    );
};
