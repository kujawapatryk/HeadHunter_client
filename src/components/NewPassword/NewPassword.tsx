import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Container, Grid, TextField } from '@mui/material';

import logo from '../../assets/images/logo.png';
import { API_URL } from '../../config/apiUrl';
import { messageHandling } from '../../utils/messageHandling';
import { messages } from '../../utils/messages';
import { navigate } from '../../utils/navigate';
import { regexPassword } from '../../utils/validation/regexPassword';
import { Btn } from '../Btn/Btn';

import './NewPassword.scss';

export const NewPassword = () => {
    const { userId, token } = useParams();
    const [form, setForm]= useState({ password: '', confirmedPassword: '' });
    const [validation, setValidation] = useState({ password: false, confirmedPassword: false });
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_URL}/user/check-token/${userId}/${token}`, {
                    method: 'GET',
                });
                const data = await res.json();

                if (res.status !== 200) {
                    console.log('raz?')
                    messageHandling(data.message, res.status);
                    return;
                }
            } catch (e) {
                console.log(e);
            } finally {
                console.log('koniec');
            }
        })();
    }, []);

    const sendForm = async () => {

        if(!regexPassword(form.password)){
            setValidation({ ...validation, password: true });
            return;
        }else{
            setValidation({ ...validation, password: false });
        }

        if(form.password !== form.confirmedPassword){
            setValidation({ ...validation, confirmedPassword: true });
            return;
        }else{
            setValidation({ ...validation, password: false });
        }

        try {
            setSpinner(true);

            const res = await fetch(`${API_URL}/user/new-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    userId,
                    token,
                }),
            });
            const data = await res.json();
            messageHandling(data.message, res.status);
            navigate('/');
        } catch (e) {
            console.log(e);
        } finally {
            console.log('koniec');
            setSpinner(false);
        }
    }

    return(
        <>
            <div className="page-background-new-password">
                <Container className="change-user-data-container">
                    <Grid container spacing={3}>
                        <Grid item xs={12} className="pass-box">
                            <img src={logo} alt="Logo" className="logo" />
                            <p className="info">Ustaw nowe hasło.</p>
                            <div className="new-password__input">
                                <TextField
                                    className="new-password__input"
                                    type="password"
                                    placeholder="Podaj hasło"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    variant="outlined"
                                    fullWidth
                                />
                                <p className="info"
                                    style={{ display: validation.password ? '' : 'none' }}>
                                    {messages.invalidPasswordFormat.message}
                                </p>
                                <TextField
                                    className="new-password__input"
                                    type="password"
                                    placeholder="Powtórz hasło"
                                    value={form.confirmedPassword}
                                    onChange={e => setForm({ ...form, confirmedPassword: e.target.value })}
                                    variant="outlined"
                                    fullWidth
                                />
                                <p className="info"
                                    style={{ display: validation.confirmedPassword ? '' : 'none' }}>{messages.mismatchedPasswords.message}</p>
                            </div>
                            <CircularProgress
                                style={{ display: spinner ? '' : 'none' }}/>
                            <Btn value={'Zapisz hasło'} onClick={sendForm}/>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}