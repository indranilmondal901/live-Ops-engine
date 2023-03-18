// import mogoose from "mongoose";
const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//defining Schema
const registerSchema = new mogoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    ph_no: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

//GENERATING TOKENS (instance--> instance.method || model --> model.static)
registerSchema.methods.generateAuthToken = async function () {
    // console.log(this)
    try {
        const token = jwt.sign({ _id: this._id.toString() }, "mnbvcxzasdfhghjkloiuyytreewqplmkonjibhuyv");// uniq , secret(min=>32 ch)
        // console.log(token);
        this.tokens = this.tokens.concat({ token : token })
        await this.save();
        return token;
    } catch (err) {
        console.log("err in generating token==>" + err);
        res.status(500).send(err);
    }
}

//PASSWORD HASHING USUING BCRYPT
registerSchema.pre("save", async function (next) {
    // console.log(this);
    if (this.isModified("password")) {
        // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10); // salt=10
        // console.log(`the hased password is ${this.password}`);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10) // salt=10 
    }
    next();
})


// creating model
const Register = new mongoose.model("Register", registerSchema)
module.exports = Register;