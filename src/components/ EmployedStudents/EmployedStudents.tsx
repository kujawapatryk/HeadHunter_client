import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Employed } from 'types';

import logo from '../../assets/images/avatar-holder.png';
import { API_URL } from '../../config/apiUrl';
import { PaginationContext } from '../../contexts/pagination.context';
import { Btn } from '../Btn/Btn';

import  './EmployedStudents.scss'

export const EmployedStudents = () =>{

    const { pagination } = useContext(PaginationContext);
    const [students,setStudents] = useState<Employed[]>([]);
    useEffect(() => {

        (async () => {
            const res = await fetch(`${API_URL}/manage/employed-students`, {
                method: 'GET',
            });
            setStudents(await res.json());
            console.log(students)

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

                                <IoIosArrowDown
                                    size={30}
                                    fill="#666666"
                                    className={'user-data__nav__svg'}
                                />
                            </div>
                        </div>

                        <div className="test" />
                    </div>

                ))}
        </>
    )
}