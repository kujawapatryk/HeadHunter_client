import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid
} from '@mui/material';
import { UserState } from 'types';

import { API_URL } from '../../../config/apiUrl';
import { snackbar } from '../../../utils/snackbar';
import { Btn } from '../../Btn/Btn';

import './FoundJob.scss';
import '../../../index.scss'

export const FoundJob = () => {

    const [spinner, setSpinner] = useState(false)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const haveJob = async () => {

        try {
            setSpinner(true);
            const res = await fetch(`${API_URL}/user/my-status`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userStatus: UserState.hired,
                }),
            });
            const data = await res.json();

            if (data.status=== true) {
                snackbar(data.message);
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
            <div className="button"><Btn value={'Znalazłem pracę!'} onClick={handleClickOpen}/></div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-describedby="alert-dialog-description"
                className="info test"
            >
                <DialogContent className="info test">
                    <DialogContentText id="alert-dialog-description" className="info">
                        <p className="info">
                        Kliknięcie &quot;Znalazłem prace&quot; oznacza utratę dostępu do serwisu. <br />
                        Zostaniesz autkomatycznie wylogowany. <br />
                        Twoje dane zostaną zachowane ale nie będą pojawiać się w wynikach wyszukiwania
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Btn value={'Anuluj'} onClick={handleClose} />
                    <Btn value={'Znalazłem prace'} onClick={haveJob} />

                </DialogActions>
            </Dialog>
        </Grid>

    )
}