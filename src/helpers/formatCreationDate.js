export const formatCreationDate = (date) => {
	if (date) {
		return date.split('/').join('.');
	}
};
