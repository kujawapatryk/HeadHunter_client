import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, CircularProgress, Container, TextField } from '@mui/material';

import logo from '../../assets/images/avatar-holder.png';
import { API_URL } from '../../config/apiUrl';
import { snackbar } from '../../utils/snackbar';

import './CVEdit.scss';
import '../../index.scss'
export const CVEdit = () =>{

    const [spinner, setSpinner] = useState(false);
    const [info, setInfo] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        githubUsername: '',
        phoneNumber: '',
        expectedTypeWork: 1,
        targetWorkCity: '',
        expectedContractType: 1,
        expectedSalary: '',
        canTakeApprenticeship: 1,
        monthsOfCommercialExp: 0,
        bio: '',
        education: '',
        courses: '',
        workExperience: '',
        portfolioUrls: '',
        bonusProjectUrls: '',
        projectUrls: ''
    });

    useEffect( () => {
        (async () => {
            const res = await fetch(`${API_URL}/student/get-cv-edit`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = (await res.json());
            setForm(data);
        })();
    }, []);

    const sendForm = async (e: SyntheticEvent) => {
        setSpinner(true);
        e.preventDefault();
        let projectValidation = false;
        form.projectUrls.split(' ').forEach(el => {
            if (!/^(http|https):\/\/[^ "]+$/.test(el)) {
                projectValidation = true;
            }
        });
        if ((form.firstName==='')||(form.lastName==='')||(form.githubUsername==='')||(form.projectUrls==='')||projectValidation){
            setInfo(true);
        } else {
            setInfo(false);
            try {

                const res = await fetch(`${API_URL}/student/change-data`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                if (res.status === 200) {
                    snackbar('dataSaved');
                }
            } catch (e) {
                snackbar('tryLater')
            } finally {
                setSpinner(false);
            }
        }
    };

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    return(
        <div className="CVEdit__wrapper">
            <Container className="CVEdit_Usercard__container">
                <div className="CVEdit_Usercard__avatar">
                    <img src={form.githubUsername ? `https://github.com/${form.githubUsername}.png`:logo} alt="user logo" />
                </div>
                <p>Imię:</p>
                <TextField
                    className="input-name"
                    name="firstName"
                    value={form.firstName}
                    onChange={e => updateForm('firstName', e.target.value)}
                    type="text"
                    placeholder="Imię"
                    variant="outlined"
                    fullWidth
                />
                <p>Nazwisko:</p>
                <TextField
                    className="input-name"
                    name="lastName"
                    value={form.lastName}
                    onChange={e => updateForm('lastName', e.target.value)}
                    type="text"
                    placeholder="Nazwisko"
                    variant="outlined"
                    fullWidth
                />
                <p>Nick z GitHuba:</p>
                <TextField
                    className="input-name"
                    name="githubUsername"
                    value={form.githubUsername}
                    onChange={e => updateForm('githubUsername', e.target.value)}
                    type="text"
                    placeholder="nick z GitHuba"
                    variant="outlined"
                    fullWidth
                />
                <p>Numer telefonu:</p>
                <TextField
                    className="input-name"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={e => updateForm('phoneNumber', e.target.value)}
                    type="text"
                    placeholder="Numer telefonu"
                    variant="outlined"
                    fullWidth
                />
            </Container>
            <Container className="CVEdit_UserCV__container">
                <div className="CVEdit_UserCV__text__container">
                    <h2>Oczekiwania w stosunku do zatrudnienia</h2>
                    <label>Preferowane miejsce pracy:
                        <select
                            name="expectedTypeWork"
                            value={form.expectedTypeWork}
                            onChange={e => updateForm('expectedTypeWork', e.target.value)}>
                            <option value={1}>Praca w biurze</option>
                            <option value={2}>Praca zdalna</option>
                        </select>
                    </label>
                    <p>Docelowe miasto, gdzie chce pracować kandydat</p>
                    <TextField
                        className="input-name"
                        name="targetWorkCity"
                        value={form.targetWorkCity}
                        onChange={e => updateForm('targetWorkCity', e.target.value)}
                        type="text"
                        placeholder="Miasto, w którym chciałbym pracować"
                        variant="outlined"
                        fullWidth
                    />
                    <label>Oczekiwany typ kontraktu:
                        <select name="expectedContractType"
                            value={form.expectedContractType}
                            onChange={e => updateForm('expectedContractType', e.target.value)}>
                            <option value={1}>Umowa o pracę</option>
                            <option value={2}>B2B</option>
                            <option value={3}>Umowa zlecenie</option>
                            <option value={4}>Umowa o dzieło</option>
                        </select>
                    </label>
                    <p>Oczekiwane wynagrodzenie miesięczne netto (w PLN):</p>
                    <TextField
                        className="input-name"
                        name="expectedSalary"
                        value={form.expectedSalary}
                        onChange={e => updateForm('expectedSalary', e.target.value)}
                        type="number"
                        placeholder="Kwota netto w złótówkach"
                        variant="outlined"
                        fullWidth
                    />
                    <label>Zgoda na odbycie bezpłatnych praktyk/stażu na początek
                        <select name="canTakeApprenticeship"
                            value={form.canTakeApprenticeship}
                            onChange={e => updateForm('canTakeApprenticeship', e.target.value)}>
                            <option value={1}>Tak</option>
                            <option value={0}>Nie</option>
                        </select>
                    </label>
                    <p>Komercyjne doświadczenie w programowaniu (miesiące):</p>
                    <TextField
                        className="input-name"
                        name="monthsOfCommercialExp"
                        value={form.monthsOfCommercialExp}
                        onChange={e => updateForm('monthsOfCommercialExp', e.target.value)}
                        type="number"
                        placeholder="Czas komercyjnego zatrudnienia (w miesiącach)"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="CVEdit_UserCV__text__container">
                    <h2>O mnie</h2>
                    <TextField
                        className="input-name"
                        name="bio"
                        value={form.bio}
                        onChange={e => updateForm('bio', e.target.value)}
                        type="text"
                        placeholder="Kilka słów o mnie"
                        multiline={true}
                        minRows={3}
                        maxRows={10}
                        fullWidth
                    />
                </div>
                <div className="CVEdit_UserCV__text__container">
                    <h2>Edukacja</h2>
                    <TextField
                        className="input-name"
                        name="education"
                        value={form.education}
                        onChange={e => updateForm('education', e.target.value)}
                        type="text"
                        placeholder="Kilka słów o mojej edukacji"
                        multiline={true}
                        minRows={3}
                        maxRows={10}
                        fullWidth
                    />
                </div>
                <div className="CVEdit_UserCV__text__container">
                    <h2>Kursy</h2>
                    <TextField
                        className="input-name"
                        name="courses"
                        value={form.courses}
                        onChange={e => updateForm('courses', e.target.value)}
                        type="text"
                        placeholder="Kilka słów o moich kursach"
                        multiline={true}
                        minRows={3}
                        maxRows={10}
                        fullWidth
                    />
                </div>
                <div className="CVEdit_UserCV__text__container">
                    <h2>Doświadczenie</h2>
                    <TextField
                        className="input-name"
                        name="workExperience"
                        value={form.workExperience}
                        onChange={e => updateForm('workExperience', e.target.value)}
                        type="text"
                        placeholder="Kilka słów o moim doświadczeniu"
                        multiline={true}
                        minRows={3}
                        maxRows={10}
                        fullWidth
                    />
                </div>
                <div className="CVEdit_UserCV__text__container">
                    <h2>Portfolio</h2>
                    <TextField
                        className="input-name"
                        name="portfolioUrls"
                        value={form.portfolioUrls}
                        onChange={e => updateForm('portfolioUrls', e.target.value)}
                        type="text"
                        placeholder="Linki do mojego portfolio"
                        multiline={true}
                        minRows={3}
                        maxRows={10}
                        fullWidth
                    />
                </div>
                <div className="CVEdit_UserCV__text__container">
                    <h2>Projekty w zespole Scrumowym</h2>
                    <TextField
                        className="input-name"
                        name="bonusProjectUrls"
                        value={form.bonusProjectUrls}
                        onChange={e => updateForm('bonusProjectUrls', e.target.value)}
                        type="text"
                        placeholder="Linki do projektów scrumowych"
                        multiline={true}
                        minRows={3}
                        maxRows={10}
                        fullWidth
                    />
                </div>
                <div className="CVEdit_UserCV__text__container">
                    <h2>Projekty na zaliczenie</h2>
                    <TextField
                        className="input-name"
                        name="projectUrls"
                        value={form.projectUrls}
                        onChange={e => updateForm('projectUrls', e.target.value)}
                        type="text"
                        placeholder="Linki do projektów zaliczeniowych"
                        multiline={true}
                        minRows={3}
                        maxRows={10}
                        fullWidth
                    />
                </div>
                <p style={{ display: info ? '' : 'none' }}>Musisz podać: imię, nazwisko, nick w Github oraz projekt na zaliczenie.</p>
                <CircularProgress
                    style={{ display: spinner ? '' : 'none' }}/>
                <Button
                    className="sendCvBtn"
                    onClick={sendForm}
                >
                    Zapisz
                </Button>
            </Container>
        </div>
    )
}