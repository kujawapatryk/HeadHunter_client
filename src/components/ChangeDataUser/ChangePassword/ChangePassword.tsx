import React, { useState } from 'react';
import { CircularProgress, Container, Grid, TextField } from '@mui/material';

import { API_URL } from '../../../config/apiUrl';
import { messages } from '../../../utils/messages';
import { snackbar } from '../../../utils/snackbar';
import { regexPassword } from '../../../utils/validation/regexPassword';
import { Btn } from '../../Btn/Btn';

import './ChangePassword.scss';

export const ChangePassword = () =>{

    const [spinner,setSpinner] = useState(false)
    const [validPass, setValidPass] = useState(true);
    const [validPass2, setValidPass2] = useState(true);
    const [form, setForm] = useState({
        password: '',
        confirmedPassword: ''
    });

    const sendForm = async () => {

        if (!regexPassword(form.password)){
            setValidPass(false);
        } else if (form.password!==form.confirmedPassword){
            setValidPass(true);
            setValidPass2(false);
        } else {
            setValidPass2(true);

            try {
                setSpinner(true);
                const res = await fetch(`${API_URL}/user/change-password`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                if (data) {
                    setForm({
                        password: '',
                        confirmedPassword: '',
                    });

                    snackbar(data.message);
                }
            } catch (e) {
                snackbar('tryLater');

            } finally {
                setSpinner(false);
            }
        }
    }

    return (
        <Container className="container__change-password">
            <Grid container spacing={3}>
                <Grid item xs={12}>

                    <p className="info">Zmień hasło</p>
                    <TextField
                        className="form-input"
                        type="password"
                        placeholder="Podaj hasło"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        variant="outlined"
                        fullWidth
                    />
                    <p className="info"
                        style={{ display: validPass ? 'none' : '' }}>
                        {messages.invalidPasswordFormat.message}
                    </p>
                    <TextField
                        className="form-input"
                        type="password"
                        placeholder="Powtórz hasło"
                        value={form.confirmedPassword}
                        onChange={e => setForm({ ...form, confirmedPassword: e.target.value })}
                        variant="outlined"
                        fullWidth
                    />
                    <p className="info"
                        style={{ display: validPass2 ? 'none' : '' }}>{messages.mismatchedPasswords.message}</p>
                    <CircularProgress
                        style={{ display: spinner ? '' : 'none' }}/>
                    <div className="button"><Btn value={'Zapisz hasło'} onClick={sendForm} /></div>

                </Grid>
            </Grid>
        </Container>
    )
}