const Register = require("../models/schema");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        let token = req.body.token;
        console.log("from auth.js==>" + token)
        if (!token) {
            return res.sendStatus(401);
        } else {
            const verifyUser = jwt.verify(token, "mnbvcxzasdfhghjkloiuyytreewqplmkonjibhuyv");
            console.log(verifyUser);
            if (!verifyUser) {
                console.log("please login first")
            }

            const user = await Register.findOne({ _id: verifyUser._id });
            // console.log("verified user is ===>" + user);
            req.token = token;
            req.user = user;
        }
        next()
    } catch (err) {
        return res.sendStatus(500);
    }
}
module.exports = auth;