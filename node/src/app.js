import dotenvx from "@dotenvx/dotenvx";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import apiRouter from "./api/index.js";

const app = express();

dotenvx.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", apiRouter);

const PORT = process.env.PORT || 12306;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
