import React, { useState } from 'react';
import { CircularProgress, Grid, TextField } from '@mui/material';

import { API_URL } from '../../../config/apiUrl';
import { messages } from '../../../utils/messages';
import { navigate } from '../../../utils/navigate';
import { snackbar } from '../../../utils/snackbar';
import { Btn } from '../../Btn/Btn';

import './ChangeEmail.scss';

export const ChangeEmail = () => {
    const userId = localStorage.getItem('userid');
    const [email, setEmail] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [validMail,setValidMail] = useState(false);

    const sendForm = async () => {

        if(email.includes('@')){

            try {
                setSpinner(true);
                const res = await fetch(`${API_URL}/user/changemail`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                        email,
                    }),
                });
                const data = await res.json();
                if (data) {
                    setEmail('');
                    console.log('Dane zostały zapisane.');
                    navigate('/edit');
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
        <Grid item xs={12} className="container__change-email">
            <p className="info">Zmień adres e-mail</p>
            <TextField
                className="form-input"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <p className="info"
                style={{ display: validMail ? '' : 'none' }}>{messages.invalidEmail.message}</p>
            <CircularProgress
                style={{ display: spinner ? '' : 'none' }}/>
            <div className="button"><Btn value={'Zapisz e-mail'} onClick={sendForm} /></div>

        </Grid>
    )
}