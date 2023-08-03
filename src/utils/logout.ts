
import { API_URL } from '../config/apiUrl';

import { snackbar } from './snackbar';

export const logout = async (navigate: any) => {

    const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
    });
    const { status, message } = await res.json();
    if (status === 'ok') {
        localStorage.clear();
        snackbar(message);
        navigate('/');
    }
}