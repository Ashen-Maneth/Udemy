import dotenv from "dotenv";
import express from "express";

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
})  

app.get("/about", (req, res) => {
    res.send("About Page");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});