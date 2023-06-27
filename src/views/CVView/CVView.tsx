import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { Internship, SingleStudent, TypeWork } from 'types';

import { Header } from '../../components/Header/Header';
import { UserCard } from '../../components/UserCard/UserCard';
import { UserCV } from '../../components/UserCV/UserCV';
import { API_URL } from '../../config/apiUrl';
import { messageHandling } from '../../utils/messageHandling';
import { month } from '../../utils/month';
import { navigate } from '../../utils/navigate';

import './CVView.scss';
import '../../index.scss'

export const CVView = () => {
    //  const navigate = useNavigate();
    const contractType = ['', 'Umowa o pracę', 'B2B', 'Umowa zlecenie', 'Umowa o dzieło'];
    const { studentId } = useParams<string>();
    const [data, setData] = useState<SingleStudent | null>(null);
    const hrId = localStorage.getItem('userid');
    useEffect( () => {
        (async () => {
            const res = await fetch(`${API_URL}/student/getcv/${studentId}/${hrId}`);
            const data = await res.json();
            if(data.message)
                if(!messageHandling(data.message,res.status))  return;
            setData(data);

        })();
    }, []);

    return (
        <>
            {data && (
                <div className="CVView__container">

                    <Header/>
                    <div className="page__container">
                        <button
                            className="CVView__back"
                            onClick={() => { navigate('/list/reserved') }}
                        >
                            <IoIosArrowDown size={30} className="CVView__back__svg" />
                            <span className="CVView__back__span">Wróć</span>
                        </button>

                        <div className="CVView__wrapper">
                            <UserCard
                                id={studentId as string}
                                aboutMe={data.bio}
                                name={(data.firstName) + ' ' + (data.lastName)}
                                github={data.githubUsername}
                                email={data.email}
                                phoneNumber={data.phoneNumber}
                            />
                            <UserCV
                                grades={[
                                    { header: 'Ocena projektu kursu', value: `${data.courseCompletion}/5` },
                                    {
                                        header: 'Ocena aktywności i  zaangażowania na kursie',
                                        value: `${data.courseEngagement}/5`
                                    },
                                    { header: 'Ocena kodu w projekcie własnym', value: `${data.teamProjectDegree}/5` },
                                    { header: 'Ocena pracy w zespole w Scrum', value: `${data.projectDegree}/5` },
                                ]}
                                expectations={[
                                    { header: 'Preferowane miejsce pracy', value: TypeWork[data.expectedTypeWork] },
                                    { header: 'Docelowe miasto, gdzie chce pracować kandydat', value: data.targetWorkCity },
                                    { header: 'Oczekiwany typ kontraktu', value: contractType[data.expectedContractType] },
                                    { header: 'Oczekiwane wynagrodzenie miesięczne netto', value: `${data.expectedSalary} zł` },
                                    {
                                        header: 'Zgoda na odbycie bezpłatnych praktyk/stażu na początek',
                                        value: Internship[data.canTakeApprenticeship as number]
                                    },
                                    {
                                        header: 'Komercyjne doświadczenie w programowaniu',
                                        value: month(data.monthsOfCommercialExp)
                                    },
                                ]}
                                education={data.education}
                                courses={data.courses}
                                experience={data.workExperience}
                                portfolio={data.portfolioUrls === null ? [] : data.portfolioUrls.split(' ')}
                                finalProjects={data.projectUrls === null ? [] : data.projectUrls.split(' ')}
                                scramProjects={data.bonusProjectUrls === null ? [] : data.bonusProjectUrls.split(' ')}
                            />
                        </div>
                        <div className="empty-space"></div>
                    </div>

                </div>
            )}
        </>
    );
};
