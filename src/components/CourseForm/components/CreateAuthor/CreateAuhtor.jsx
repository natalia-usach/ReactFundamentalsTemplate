import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Input } from '../../../../common';
import { saveAuthor } from '../../../../store/slices/authorsSlice';

const CreateAuthor = () => {
	const buttonText = 'CREATE AUTHOR';

	const [authorName, setAuthorName] = useState({
		name: 'authorName',
		value: '',
		error: '',
	});

	const dispatch = useDispatch();

	const onAuthorChange = (event) => {
		setAuthorName({ ...authorName, value: event.target.value.trim() });
	};

	const onCreateAuthorClick = (event) => {
		event.preventDefault();
		if (authorName.value.length < 2) {
			setAuthorName({
				...authorName,
				error: 'Author name should be at least 2 characters long.',
			});
		} else {
			const newAuthor = { id: `${Date.now()}`, name: authorName.value };
			dispatch(saveAuthor(newAuthor));
			setAuthorName({ ...authorName, value: '', error: '' });
		}
	};

	return (
		<div>
			<Input
				labelText='Author name'
				placeholderText='Input text'
				data-testid='createAuthorInput'
				onChange={onAuthorChange}
				value={authorName.value}
			/>
			<p style={{ color: 'red' }}>{authorName.error}</p>
			<Button
				buttonText={buttonText}
				handleClick={onCreateAuthorClick}
				data-testid='createAuthorButton'
			/>
		</div>
	);
};

export { CreateAuthor };
