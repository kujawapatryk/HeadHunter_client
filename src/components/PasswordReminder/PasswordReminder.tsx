import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Container, Grid, TextField } from '@mui/material';

import logo from '../../assets/images/logo.png';
import { API_URL } from '../../config/apiUrl';
import { messageHandling } from '../../utils/messageHandling';
import { snackbar } from '../../utils/snackbar';
import { regexEmail } from '../../utils/validation/regexEmail';

import '../../index.scss';
import './PasswordReminder.scss';

export const PasswordReminder: React.FC = () => {
    const [spinner, setSpinner] = useState(false);
    const [email,setEmail] = useState('');
    const navigate = useNavigate()

    const changeHandle = (event: ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value);
    }

    const sendForm = async () =>{
        if(!regexEmail(email)){
            snackbar('invalidEmail');
            return;
        }
        setSpinner(true)
        try{
            const res = await fetch(`${API_URL}/user/reset/${email}`, {
                method: 'GET',
            });
            const data = await res.json();
            if(res.status === 200){
                navigate('/');
            }
            messageHandling(data.message,res.status)
        }finally {
            setSpinner(false)
        }
    }

    return (
        <div className="page-background">
            <Container maxWidth="md" className="login-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} className="email-box">
                        <img src={logo} alt="Logo" className="logo" />

                        <p className="infoAboutSendLink">Na podany adres e-mail zostanie przesłany link.</p>

                        <TextField
                            value={email}
                            className="login-email"
                            id="login-email"
                            color="primary"
                            type="email"
                            placeholder="E-mail"
                            variant="outlined"
                            onChange={changeHandle}
                            fullWidth
                        />
                        <Grid container justifyContent="center">
                            <CircularProgress
                                style={{ display: spinner ? '' : 'none' }}/>
                            <Button className="login-btn"
                                onClick={sendForm}>
                                Zresetuj hasło
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};