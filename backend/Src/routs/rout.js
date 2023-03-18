const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const auth = require("../middlewire/auth");
const { json } = require("body-parser");

//collection or models
const Register = require("../models/schema");
const Offer = require("../models/offerschema");

//use router
const router = new express.Router();

// middlewire
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(express.json())
router.use(cors());
router.use(cookieParser());

//define router

//REGISTRATION
router.post("/register", async (req, res) => {
    // console.log(req.body);
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirm_password;
        if (password === confirmPassword) {
            const userData = new Register({
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                age: req.body.age,
                ph_no: req.body.phone,
                password: password,
                confirmPassword: confirmPassword
            });
            // console.log(userData);
            //password hasing ==> concept of middlewire
            //token generation
            const token = await userData.generateAuthToken();
            console.log(` regToken from rout.js ==> ${token}`)

            //The res.cooke() function is used to set the cooke name to value;
            //The value parameter may be a string or obj converted to JSON.
            // res.cookie("regJwt", token, {
            //     expires: new Date(Date.now() + 120000),
            //     // httpOnly: true
            // });
            // console.log(`regJwt jwt is --> ${req.cookies.rememberme}`)

            await userData.save();
            console.log("data sending to db is ==>" + userData);

            res.status(201).send({
                status: "Sucessfully registered",
                data: userData
            })
        } else {
            console.log("your pw and cpw not matched")
            res.send("your pw and cpw not matched")
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "cath err",
            msg: err.message
        })
    }
})
router.use(cookieParser());

//LOGIN
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const enteredUsername = req.body.username;
    const enteredPassword = req.body.password;
    // console.log(enteredUsername, enteredPassword);

    const loginUserData = await Register.findOne({ email: enteredUsername });
    // console.log(loginUserData)

    if (loginUserData) {

        const checkPassword = await bcrypt.compare(enteredPassword, loginUserData.password);
        // console.log(checkPassword);

        if (checkPassword) {
            const token = await loginUserData.generateAuthToken();
            console.log(` logintoken from rout.js==> ${token}`)

            // res.cookie("loginJwt", token, {
            //     expires: new Date(Date.now() + 120000),
            //     // httpOnly: true
            // });
            // console.log(`login jwt is --> ${req.cookies.loginJwt}`)

            console.log("login sucessfully");
            res.status(200).send({
                status: "login sucessful",
                token: token
            })
        } else {
            console.log("password not match");
            res.status(500).send({
                status: 500,
                message: "invalid credential"
            })
        }
    } else {
        console.log("userdata not match");
        res.status(500).send({
            status: 500,
            message: "invalid credential"
        })
    }

})
router.use(cookieParser());


// router.get("/", (req, res) => {
//     res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000) });
//     res.send("hi");
// })

//LOG OUT
router.post("/logout", auth, async (req, res) => {
    try {
        console.log(`this user is logged out ==> ${req.user.firstName} ${req.user.lastName}`)
        //logout from all devices
        // const tokens = await Register.findByIdAndDelele({_id: req.user._id},{tokens: []},{new: true })
        req.user.tokens = [];
        req.user.save()

        res.status(200).send({
            message: "verified",
            // user: user
        });
    } catch (err) {
        res.status(501).send({
            msg: "err in logout",
            err: err
        })
    }
})
//Admin Acess
router.post("/offer", auth, (req, res) => {
    console.log("here admin is" + req.user.firstName)
    res.status(200).send({
        message: "verified",
        user: req.user
    });
})

//Offer
router.post("/offercreated", async (req,res)=>{
    console.log(req.body.offer);
    const data = await JSON.parse(req.body.offer)
    const newOffer = new Offer(data)
    await newOffer.save();
    res.status(200).send({
        status:"offer created"
    })
})
router.get("/showOrder",async (req,res)=>{
    const data = await Offer.find();
    res.status(200).send({
        status:"sucessfull",
        data : data
    })

})

module.exports = router;