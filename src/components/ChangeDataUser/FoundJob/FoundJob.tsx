import React, { useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';

import { API_URL } from '../../../config/apiUrl';
import { snackbar } from '../../../utils/snackbar';
import { Btn } from '../../Btn/Btn';

import './FoundJob.scss';

export const FoundJob = () => {
    const userId = localStorage.getItem('userid');
    const [spinner, setSpinner] = useState(false)

    const haveJob = async () => {

        try {
            setSpinner(true);
            const res = await fetch(`${API_URL}/user/my-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    userStatus: 3
                }),
            });
            const data = await res.json();
            if (data) {
                console.log('Dane zostały zapisane.')
            }
        } catch (e) {
            snackbar('tryLater');
        } finally {
            setSpinner(false);
        }
    }
    
    return(
        <Grid item xs={12} className="container__found-job">
            <p className="info">Naciśnięcie poniższego przycisku oznacza zakończenie korzystania z portalu. Powodzenia w nowej pracy!</p>
            <CircularProgress
                style={{ display: spinner ? '' : 'none' }}/>
            <div className="button"><Btn value={'Znalazłem pracę!'} onClick={haveJob}/></div>

        </Grid>
    )
}