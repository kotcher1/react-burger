
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';


export const ProtectedRoute = ({ element, type = '' }) => {

    const signIn = useSelector(store => store.user.signIn);

    const login = signIn ? element : <Navigate to={"/login"}/>
    const noLogin = signIn ? <Navigate to={"/"}/> : element
  
    return type === 'no-login' ? noLogin : login;
}

ProtectedRoute.propsType = {
  element: PropTypes.element,
  type: PropTypes.string,
}