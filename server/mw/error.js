module.exports = function errorMW(err, req, res, next) {
	console.log("[!Express ERROR]: ", err.message);

	const {
		statusCode = 500,
		message = "Internal server error.",
	} = err;

	res.status(statusCode).json({
		errMsg: message,
	});
};
