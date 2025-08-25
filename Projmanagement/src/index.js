import dotenv from "dotenv";

dotenv.config();

let myusername = process.env.newusername;

console.log("hello " + myusername);