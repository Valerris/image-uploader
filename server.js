const express = require("express");
const next = require("next");
const multer = require("multer");
const path = require("path");
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, "uploads/images"));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	console.log(file);
	if (/image\/jpe?g|png|svg/gi.test(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage, fileFilter });

app
	.prepare()
	.then(() => {
		const server = express();

		server.use(
			"/static",
			express.static(path.resolve(__dirname, "uploads"))
		);

		server.post(
			"/api/upload/file",
			upload.single("file"),
			(req, res, next) => {
				const { file } = req;

				res.json({
					message: file
						? "successfully saved the file."
						: "no message",
				});
			}
		);

		server.get("*", (req, res, next) => {
			return handle(req, res);
		});

		server.listen(3030, (err) => {
			if (err) throw err;
			console.log("express is ready!");
		});
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
