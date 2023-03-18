const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

//requiring connection.js
require("./db/connection.js")

//Middlewire
app.use(express.json());


const admin_register_router = require("./routs/rout");
app.use(admin_register_router);

app.listen(port,()=>{
    console.log("Your Server Is Running On Port no ==>" + port)
})