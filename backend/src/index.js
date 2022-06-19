const express = require("express");
const path = require("path");

const connectToMongoDB = require("./db/mongoose");

const PORT = process.env.PORT || 3000;

const app = express();
connectToMongoDB();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({"msg":"created by adminseeker!"})
})

app.use("/api/auth/",require("./routers/api/auth"));
app.use("/api/users/",require("./routers/api/users"));
app.use("/api/tasks/",require("./routers/api/tasks"));
app.use("/api/scores/",require("./routers/api/scores"));

app.listen(PORT,()=>{
    console.log("Server started on port "+PORT+"!");
});