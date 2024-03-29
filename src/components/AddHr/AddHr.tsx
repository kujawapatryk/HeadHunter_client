import React, { SyntheticEvent, useState } from 'react';
import { CircularProgress, Container, Grid, TextField } from '@mui/material';

import logo from '../../assets/images/logo.png';
import { API_URL } from '../../config/apiUrl';
import { messageHandling } from '../../utils/messageHandling';
import { messages } from '../../utils/messages';
import { Btn } from '../Btn/Btn';

import '../../index.scss';
import './AddHr.scss';

const emptyForm = {
    email: '',
    fullName: '',
    company: '',
    maxReservedStudents: '',
};

export const AddHr = () => {

    const [form, setForm] = useState(emptyForm);
    const [validForm, setValidForm] = useState({
        email: false,
        name: false,
        company: false,
        maxStudent: false
    });
    const [spinner, setSpinner] = useState(false);

    const updateForm = (key: string, value: string | number) => {
        setForm((form) => ({
            ...form,
            [key]: value,
        }));

    };

    const sendForm = async (e: SyntheticEvent) => {
        setSpinner(true);
        e.preventDefault();
        setValidForm({
            email: !form.email.includes('@'),
            name: form.fullName === '',
            company: form.company === '',
            maxStudent: Number(form.maxReservedStudents) < 1 || Number(form.maxReservedStudents) > 999
        });

        if (
            form.email.includes('@') &&
            form.fullName !== '' &&
            form.company !== '' &&
            Number(form.maxReservedStudents) > 0 &&
            Number(form.maxReservedStudents) < 1000
        ) {
            try {
                const res = await fetch(`${API_URL}/manage/add-hr/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                }

                );
                const data = await res.json();
                if(!messageHandling(data.message,res.status))
                    return null;
                setForm(emptyForm);

            } finally {
                setSpinner(false);
            }
        }
        setSpinner(false)
    };

    return (
        <div className="page-background__add-hr">
            <Container className="add-hr-container">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <img src={logo} alt="Logo" className="logo" />
                        <Grid>
                            <p className="info-validation" style={{ display: validForm.email ? '' : 'none' }}>
                                {messages.invalidEmail.message}
                            </p>
                            <TextField
                                type="email"
                                className="form-input"
                                placeholder="E-mail"
                                value={form.email}
                                onChange={(e) => {
                                    updateForm('email', e.target.value);
                                }}
                                required
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid>
                            <p className="info-validation" style={{ display: validForm.name ? '' : 'none' }}>
                                {messages.nameRequired.message}
                            </p>
                            <TextField
                                type="text"
                                className="form-input"
                                placeholder="Imię i nazwisko"
                                value={form.fullName}
                                onChange={(e) => {
                                    updateForm('fullName', e.target.value);
                                }}
                                required
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid>
                            <p className="info-validation" style={{ display: validForm.company ? '' : 'none' }}>
                                {messages.organizationNameRequired.message}
                            </p>
                            <TextField
                                type="text"
                                className="form-input"
                                placeholder="Firma"
                                value={form.company}
                                onChange={(e) => {
                                    updateForm('company', e.target.value);
                                }}
                                required
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid>
                            <p className="info-validation" style={{ display: validForm.maxStudent ? '' : 'none' }}>
                                {messages.hrLimit.message}
                            </p>
                            <TextField
                                type="number"
                                className="form-input"
                                placeholder="Max. liczba kursantów"
                                value={form.maxReservedStudents}
                                onChange={(e) => {
                                    updateForm('maxReservedStudents', e.target.value);
                                }}
                                required
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid className="button">
                            <CircularProgress style={{ display: spinner ? '' : 'none' }}/>
                            <Btn value={'Zapisz'} onClick={sendForm} />
                            {/*<Button className="add-hr-btn" onClick={sendForm}>Zapisz</Button>*/}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
