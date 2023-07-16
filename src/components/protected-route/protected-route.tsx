
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

export const ProtectedRoute = ({element, type = ''}: {element: JSX.Element | null, type?: string}) => {

    const signIn = useSelector(store => store.user.signIn);

    const location = useLocation()

    const login = signIn ? element : <Navigate  state={{from: location}} to={"/login"}/>
    const noLogin = signIn ? <Navigate to={location?.state?.from || '/'}/> : element
  
    return type === 'no-login' ? noLogin : login;
}