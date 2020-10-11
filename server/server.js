const path = require("path");
const express = require("express");
const next = require("next");
const multer = require("multer");
const root = require("./util/root");
const errorMW = require("./mw/error");
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(root, "uploads/images"));
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
			express.static(path.resolve(root, "uploads"))
		);

		server.post(
			"/api/upload/file",
			upload.single("file"),
			(req, res, next) => {
				const { file } = req;

				if (!file) {
					const err = new Error("Unsupported media type");

					err.statusCode = 415;

					throw err;
				}

				res.json({
					filepath: `/static/images/${file.filename}`,
				});
			}
		);

		server.get("*", (req, res, next) => {
			return handle(req, res);
		});

		server.use(errorMW);

		server.listen(3030, (err) => {
			if (err) throw err;
			console.log("express is ready!");
		});
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
