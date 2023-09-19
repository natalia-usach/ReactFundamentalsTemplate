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

	if (response.status === 200) {
		return await response.json();
	} else {
		throw new Error(response.statusText);
	}
};

export const getAuthors = async () => {
	const response = await fetch('http://localhost:4000/authors/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 200) {
		return await response.json();
	} else {
		throw new Error(response.statusText);
	}
};

export const getCurrentUser = async () => {};

export const updateCourse = async () => {
	// write your code here
};

export const logout = async () => {
	return await fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: window.localStorage.getItem('token'),
		},
	});
};

export const deleteCourse = async (id) => {
	const response = await fetch(`http://localhost:4000/courses/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: window.localStorage.getItem('token'),
		},
	});

	return await response.json();
};

export const createCourse = async (course) => {
	const response = await fetch('http://localhost:4000/courses/add', {
		method: 'POST',
		body: JSON.stringify(course),
		headers: {
			'Content-Type': 'application/json',
			Authorization: window.localStorage.getItem('token'),
		},
	});

	return await response.json();
};

export const createAuthor = async () => {
	// write your code here
};
