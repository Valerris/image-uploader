export default (req, res) => {
	console.log(req);

	res.json(
		JSON.stringify({
			message: "success",
		})
	);
};
