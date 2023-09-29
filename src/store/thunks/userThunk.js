import { getCurrentUser, logout } from '../../services';
import { removeUserData, setUserData } from '../slices/userSlice';

export const getUserThunk = () => {
	return async function (dispatch) {
		try {
			const { result } = await getCurrentUser();

			dispatch(
				setUserData({
					name: result.name,
					email: result.email,
					token: localStorage.getItem('token'),
					role: result.role,
				})
			);
		} catch (error) {
			throw new Error(error);
		}
	};
};

export const logoutThunk = () => {
	return async function (dispatch) {
		try {
			await logout();

			dispatch(removeUserData());
		} catch (error) {
			throw new Error(error);
		}
	};
};
