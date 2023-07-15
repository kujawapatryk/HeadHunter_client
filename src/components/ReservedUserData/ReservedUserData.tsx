import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ReservedStudent, StudentProps, UpdateAction } from 'types';

import logo from '../../assets/images/avatar-holder.png';
import { API_URL } from '../../config/apiUrl';
import { FilterContext } from '../../contexts/filter.context';
import { PaginationContext } from '../../contexts/pagination.context';
import { changeStudentStatus } from '../../utils/changeStudentStatust';
import { filterQuery } from '../../utils/filterQuery';
import { fragmentValues } from '../../utils/fragmentValues';
import { Btn } from '../Btn/Btn';
import { UserDataFragment } from '../UserData/UserDataFragment/UserDataFragment';

import './ReservedUserData.scss';

type StudentResults = { allRecords: number; data: ReservedStudent[] };

export const ReservedUserData = () => {

    const navigate = useNavigate();

    const { filterCon } = useContext(FilterContext);
    const [studentData, setStudentData] = useState<StudentProps[]>([]);
    const { pagination, setPagination } = useContext(PaginationContext);
    const dateFragmentWidth = ['8%','10%','8%','8%','10%','10%','10%','12%','12%','12%'];

    const changeStatus = async (studentId: string, index: number, action: number) => {
        try {
            await changeStudentStatus(studentId,action)

        } finally {
            setStudentData((studentData) => {
                return studentData.filter((_, i) => i !== index);
            });
        }
    };

    const isOpen = (index: number) => {
        setStudentData((studentData) => {
            return studentData.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        open: !item.open,
                    };
                } else {
                    return item;
                }
            });
        });
    };

    useEffect(() => {
        const filtersParams = new URLSearchParams(filterQuery(filterCon,pagination,'reserved'));

        (async () => {
            const res = await fetch(`${API_URL}/student/students?${filtersParams}`, {
                method: 'GET',
                credentials: 'include',
            });
            const { data, allRecords }: StudentResults = await res.json();
            const student = fragmentValues(data);
            setStudentData(student);
            setPagination({
                ...pagination,
                allRecords: Number(allRecords),
            });
        })();

    }, [pagination.page, filterCon]);

    const formatDate = (reservationEndDate: string) => {

        const date = new Date(reservationEndDate)
        return  date.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const showCv = (id:string) => {
        navigate(`/cv/${id}`)
    }

    return (
        <>
            {studentData &&
        studentData.map((item, index) => (
            <div className="reserved-user-data__container" key={index}>
                <div className="reserved-user-data__nav">
                    <div className="user-container">
                        <div className='date-and-img'>
                            <div className="reservation-date">
                                <p>Rezerwacja do: </p>
                                <p className='date'>{formatDate(item.reservationExpiresOn as string)}</p>
                            </div>
                            <img src={item.githubUsername ? `https://github.com/${item.githubUsername}.png` : logo} alt="user logo" />
                        </div>
                        <div className="test2">
                            <h4>{item.name}</h4>
                        </div>
                    </div>
                    <div className="input-container">
                        <Btn value="Pokaż CV" onClick={() => showCv(item.id)} />
                        <Btn value="Brak zainteresowania" onClick={() => changeStatus(item.id, index, UpdateAction.disinterest)} />
                        <Btn value="Zatrudniony" onClick={() => changeStatus(item.id, index, UpdateAction.employ)} />
                        <IoIosArrowDown
                            size={30}
                            fill="#666666"
                            className={`${item.open ? 'user-data__nav__svg--rotate' : 'user-data__nav__svg'}`}
                            onClick={() => {
                                isOpen(index);
                            }}
                        />
                    </div>
                </div>
                {item.open && (
                    <div className="user-data__fragments">
                        {item.fragmentsValues.map(({ header, value }, id) => {
                            return <UserDataFragment header={header} value={value} key={id} width={dateFragmentWidth[id]} />;
                        })}
                    </div>
                )}
                <div className="test" />
            </div>
        ))}
        </>
    );
};
