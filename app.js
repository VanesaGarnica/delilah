require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const productRouter = require("./api/product/product.router");
const userRouter = require("./api/user/user.router");

app.use(bodyParser.json());

app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

app.get("/api", (req, res) => {
    res.json({
        success: 1,
        message: "This is rest apis working"
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on port: ", process.env.APP_PORT);
});