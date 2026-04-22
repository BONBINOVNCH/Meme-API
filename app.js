require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const memesRouter = require("./src/routes/memes");
const templatesRouter = require("./src/routes/templates");
const triggersRouter = require("./src/routes/triggers");
const swaggerSpec = require("./src/docs/swagger");

const app = express();

app.use(express.static("public"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/memes", memesRouter);
app.use("/api/templates", templatesRouter);
app.use("/api/triggers", triggersRouter);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(
                "Database connected. Server started at http://localhost:" +
                    (process.env.PORT || 3000),
            );
        });
    })
    .catch((err) => console.log(err));
