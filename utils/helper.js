const getMaximumNumberInArray = (arr) => {
	const maxInteger = arr.reduce((a, b) => {
		return Math.max(a, b);
	});
	return maxInteger;
};

module.exports = { getMaximumNumberInArray };
