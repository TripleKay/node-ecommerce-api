const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

const app = express();
env.config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.awqhro4.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`,{
    useNewUrlParser: true
}).then(()=>[
    console.log('Database connected')
]);

app.use(express.json());
app.use("/api/v1",authRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
});