import { useNavigate } from 'react-router-dom';

export const navigate = (data:string):void =>{
    const navigate = useNavigate();
    navigate(data);
}