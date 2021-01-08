const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3001;
const config = require("./config");
const { Memo } = require("./Memo");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("mongodb connected!!!!!"))
	.catch((err) => console.log(err));

app.get("/memo", async (req, res) => {
	const data = await Memo.find();
	return res.json({ success: true, memos: data });
});

app.post("/memo", (req, res) => {
	const memo = new Memo(req.body);

	memo.save((err, memoData) => {
		if (err) {
			return res.json({ success: false, err });
		}
		return res.json({
			success: true,
		});
	});
});

app.delete("/memo", (req, res) => {
	console.log(req.body.key);
	Memo.deleteOne({ seq: req.body.key })
		.then((res) => {
			return res.json({ success: true });
		})
		.catch((err) => {
			return res.json({ success: false, err });
		});
});

app.listen(port, () => console.log(`server listening on port ${port}!`));
