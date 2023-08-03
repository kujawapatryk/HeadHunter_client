import { UserState } from 'types';

type Props = {
    id: number,
    name: string,
    state: number,
    githubUsername: string,

}

export const setLocalStorageLogin = (data: Props, navigate: (path: string) => void): void => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('permission', data.state.toString());
    localStorage.setItem('megakname', data.name);
    if (data.state === UserState.admin) {
        navigate('/admin/employed');
    } else if (data.state === UserState.hr) {
        navigate('/list');
    } else if (data.state === UserState.student){
        localStorage.setItem('gitname', data.githubUsername);
        navigate('user/edit');
    }

}