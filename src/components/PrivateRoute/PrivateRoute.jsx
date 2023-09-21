import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { userRoleSelector } from '../../store/selectors';

export const PrivateRoute = ({ children }) => {
	const role = useSelector(userRoleSelector);

	return role === 'admin' ? children : <Navigate to='/courses' />;
};
