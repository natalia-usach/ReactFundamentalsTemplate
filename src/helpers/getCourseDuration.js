export const getCourseDuration = (duration) => {
	let hours = duration / 60;
	let roundedHours = Math.floor(hours);

	if (roundedHours < 10) {
		roundedHours = `0${roundedHours}`;
	}

	let minutes = Math.round((hours - roundedHours) * 60);

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${roundedHours}:${minutes} ${+roundedHours === 1 ? 'hour' : 'hours'}`;
};
