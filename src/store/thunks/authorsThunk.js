import { createAuthor, getAuthors } from '../../services';
import { saveAuthor, setAuthors } from '../slices/authorsSlice';

export const createAuthorThunk = (author) => {
	return async function (dispatch) {
		try {
			const { result } = await createAuthor(author);
			dispatch(saveAuthor(result));
		} catch (error) {
			throw new Error(error);
		}
	};
};

export const getAuthorsThunk = () => {
	return async function (dispatch) {
		const response = await getAuthors();

		dispatch(setAuthors(response.result));
	};
};
