import React, { useContext, useEffect, useState } from 'react';
import { Employed } from 'types';

import logo from '../../assets/images/avatar-holder.png';
import { API_URL } from '../../config/apiUrl';
import { PaginationContext } from '../../contexts/pagination.context';
import { messageHandling } from '../../utils/messageHandling';
import { Btn } from '../Btn/Btn';

import  './EmployedStudents.scss'

type PropsEmployedStudents= {
    student: Employed[];
    totalCount: number;
    message?: string;
}

export const EmployedStudents = () =>{

    const { pagination, setPagination } = useContext(PaginationContext);
    const [students,setStudents] = useState<Employed[]>([]);
    useEffect(() => {

        (async () => {
            const page ={
                page: pagination.page.toString(),
                rowsPerPage: pagination.rowsPerPage.toString(),
            }
            const query =new URLSearchParams(page);
            const res = await fetch(`${API_URL}/manage/employed-students?${query}`, {
                method: 'GET',
            });
            const data:PropsEmployedStudents = await res.json()
            if(data.message) {
                messageHandling(data.message, res.status);
                return;
            }
            setPagination({
                ...pagination,
                allRecords: Number(data.totalCount),
            });
            setStudents(data.student);

        })();

    }, [pagination.page]);

    return(
        <>
            {students &&
                students.map((item, index) => (

                    <div className="employed-student__container" key={index}>
                        <div className="employed-student-data__nav">
                            <div className="user-container">
                                <div className='date-and-img'>

                                    <img src={item.githubUsername ? `https://github.com/${item.githubUsername}.png` : logo} alt="user logo" />
                                    <div className="test2">
                                        <h4>{item.firstName} {item.lastName}</h4>
                                    </div>
                                    <div className="user-date">
                                        <p>{item.fullName} </p>
                                        <p className='date'>{item.company}</p>
                                    </div>

                                </div>

                            </div>
                            <div className="input-container">
                                <Btn value="Przywróć studenta"  />
                            </div>
                        </div>

                        <div className="test" />
                    </div>

                ))}
        </>
    )
}