import React, { useState } from 'react';
import { CircularProgress, Container, Grid, TextField } from '@mui/material';

import { API_URL } from '../../../config/apiUrl';
import { messages } from '../../../utils/messages';
import { snackbar } from '../../../utils/snackbar';
import { regexEmail } from '../../../utils/validation/regexEmail';
import { Btn } from '../../Btn/Btn';

import './ChangeEmail.scss';

export const ChangeEmail = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [validMail,setValidMail] = useState(false);

    const sendForm = async () => {

        if(regexEmail(email)){

            try {
                setSpinner(true);
                const res = await fetch(`${API_URL}/user/change-email`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password,
                        email,
                    }),
                });
                const data = await res.json();
                if (data) {

                    snackbar(data.message);
                    if(res.status === 200){
                        setEmail('');
                        setPassword('');
                    }
                }
            } catch (e) {
                snackbar('tryLater');
            } finally {
                setSpinner(false);
            }

        } else {
            setValidMail(true);
        }
    }
    
    return(
        <>
            <Container className="container__change-email">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <p className="info">Zmień adres e-mail</p>
                        <TextField
                            className="form-input"
                            type="email"
                            placeholder="Nowy e-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <p className="info"
                            style={{ display: validMail ? '' : 'none' }}>{messages.invalidEmail.message}</p>

                        <TextField
                            className="form-input"
                            type="password"
                            placeholder="Aktualne hasło"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <p className="info"
                            style={{ display: validMail ? '' : 'none' }}>{messages.invalidEmail.message}</p>

                        <CircularProgress
                            style={{ display: spinner ? '' : 'none' }}/>
                        <div className="button"><Btn value={'Zapisz e-mail'} onClick={sendForm} /></div>

                    </Grid>
                </Grid>
            </Container>
        </>
    )
}