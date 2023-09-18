import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
	const isAuthorised = !!localStorage.getItem('token');

	return isAuthorised ? <Navigate to='/courses' /> : <Navigate to='/login' />;
};
