const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const fetchuser = require('../middleware/fetchuser')
const User = require('../models/User')

const JWT_SECRET = 'Huzaifaisawebdevl@per';

// Router 1: All Validations for user Creation
router.post('/createuser', [
    body('name', "Enter a Valid Name").isLength({ min: 3 }),
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password must be alteast 8 characters").isLength({ min: 8 }),
], async (req, res) => {

    // Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check Wether the user with email exists or not

    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User with this Email ALready Exists" });
        }

        // Generate hash and salt for password Security using bcrypt package
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);




        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        }
        )
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Occured")
    }
}

)


//Router 2: Validations For User Authentication | Login

router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password')
        .exists().withMessage("Paswword Cannot be Empty")
        .isLength({ min: 8 }).withMessage("Password Cannot be Less than 8 characters"),
], async (req, res) => {

    // Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please Login with correct Credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please Login with correct Credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success ,  authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// Route 3: Get User Logged in details using Post | Login Required

router.post('/getuser', fetchuser, async (req, res) => {

    try {

        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;