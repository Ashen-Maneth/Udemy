import express from "express";
import cors from "cors";


const app = express();

app.use(
    cors({
        origin: process.env.CROS_ORIIN,
        credentials : true
    })
)

// commen middleware
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));



// imports routes
import healthcheckRoute from "./routes/healthcheck.routes.js";


// routes
app.use("/api/v1/healthcheck", healthcheckRoute);







export{app};