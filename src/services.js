export const createUser = async (data) => {
	const response = await fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
};

export const login = async (data) => {
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
};

export const getCourses = async () => {
	const response = await fetch('http://localhost:4000/courses/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	try {
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
};

export const getAuthors = async () => {
	const response = await fetch('http://localhost:4000/authors/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	try {
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	const response = await fetch('http://localhost:4000/users/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});

	try {
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
};

export const updateCourse = async (id, course) => {
	const response = await fetch(`http://localhost:4000/courses/${id}`, {
		method: 'PUT',
		body: JSON.stringify(course),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});

	try {
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
};

export const logout = async () => {
	return await fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});
};

export const deleteCourse = async (id) => {
	const response = await fetch(`http://localhost:4000/courses/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});

	try {
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
};

export const createCourse = async (course) => {
	const response = await fetch('http://localhost:4000/courses/add', {
		method: 'POST',
		body: JSON.stringify(course),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});

	try {
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
};

export const createAuthor = async (author) => {
	const response = await fetch('http://localhost:4000/authors/add', {
		method: 'POST',
		body: JSON.stringify(author),
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});

	try {
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
};
