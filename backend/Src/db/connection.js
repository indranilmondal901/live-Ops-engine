const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";
const dbName = "Admin_registration_Api";
const uris = url + "/" + dbName;

//connection Part
mongoose.connect(uris, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>
    console.log("mongoDb is connected with Node.JS sucessfully")
).catch((err) =>
    console.log(`failed to connect with mongoDb and error is ${err}`)
)