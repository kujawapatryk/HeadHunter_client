import { API_URL } from '../config/apiUrl';

import { messageHandling } from './messageHandling';

export const changeStudentStatus = async (studentId: string, action:number) =>{
    const hrId = localStorage.getItem('userid');
    const res = await fetch(`${API_URL}/student/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action,
            studentId,
            hrId,
        }),
    });
    const data = await res.json();
    if(!await messageHandling(data.message,res.status))  return;
}