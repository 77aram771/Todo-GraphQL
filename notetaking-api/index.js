import cors from "cors";
import express from "express";
import graphlHTTP from "express-graphql";
import mongoose from "mongoose";

import schema from "./graphQlModels/schema";

mongoose.Promise = global.Promise;

mongoose
    .connect("mongodb+srv://Aram:Aram77@cluster0-vjigt.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => {
        console.log('res', res)
    })
    .catch((err) => {
        console.log('err', err)
    })

const app = express();
const PORT = 4400;

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Notetaking API v1"
    });
});

app.use(
    "/graphql",
    graphlHTTP({
        schema: schema,
        graphiql: true
    })
);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
