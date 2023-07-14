import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, Container, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { UserState } from 'types';

import logo from '../../assets/images/logo.png';
import { API_URL } from '../../config/apiUrl';
import { messages } from '../../utils/messages';
import { regexPassword } from '../../utils/validation/regexPassword';

import './Login.scss';
import '../../index.scss'

interface LoginProps {
    setLoggedIn: (loggedIn: boolean) => void;
}

// interface LoginParams {
//     email: string;
//     password: string;
// }

export const Login: React.FC<LoginProps> = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputTextEmail, setInputTextEmail] = useState(false);
    const [inputTextPassword, setInputTextPassword] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const login = async () => {

        const regexEmail = /^\S+@\S+\.\S+$/;

        if(!regexEmail.test(email)){
            setInputTextEmail(true);
            return;
        }
        if(!regexPassword(password)){
            setInputTextPassword(true);
            return;
        }
        setSpinner(true);
        try {
            const response = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setLoggedIn(true);
                localStorage.setItem('userid', data.id);
                localStorage.setItem('megakname', data.name);
                if (data.state === UserState.admin) {
                    navigate('/admin/employed');
                } else if (data.state === UserState.hr) {
                    navigate('/list');
                } else if (data.state === UserState.student){
                    localStorage.setItem('gitname', data.githubUsername);
                    navigate('/edit');
                }
            } else {
                setError(data.message);
                console.log(error);
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during login.');
        } finally {
            setSpinner(false);
        }

    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="page-background">
            <Container className="login-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} className="email-box">
                        <img src={logo} alt="Logo" className="logo" />
                        <p className="infoAboutValidation"
                            style={{ display: inputTextEmail ? '' : 'none' }}
                        >To nie jest prawidłowy e-mail</p>
                        <TextField
                            className="login-email"
                            id="login-email"
                            type="email"
                            placeholder="E-mail"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <p className="infoAboutValidation"
                            style={{ display: inputTextPassword ? '' : 'none' }}
                        >{messages.invalidPasswordFormat.message}</p>
                        <TextField
                            className="login-pass"
                            id="login-pass"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Hasło"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={handlePasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            aria-label="toggle password visibility"
                                            onClick={handlePasswordVisibility}
                                            className="login-pass-visibility-icon"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Button
                            className="forgot-password-link" color="primary"
                            onClick={() => navigate('/password-reset')}
                        >
                            Zapomniałeś hasła?
                        </Button>
                    </Grid>
                    <Grid
                        container
                        className="second-line"
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'baseline'}
                    >
                        <Grid item>
                            <CircularProgress style={{ display: spinner ? '' : 'none' }}/>
                            <Button
                                className="login-btn"
                                onClick={login}
                            >
                                Zaloguj się
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};