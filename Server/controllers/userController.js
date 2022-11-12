const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Trip = require('../models/tripModel');
const Ticket = require('../models/ticketModel');




// register user

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    //check if u ser exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // hache password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);



    // create user regester in db
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }



})

// email exists
const emailExist = asyncHandler(async (req, res) => {

    const { email } = req.body;
    // check if email and password are filled
    const user = await User.findOne({ email });
    res.status(200)

    if (user) {
        res.json({
            emailExist: true,
        })
    } else {
        res.json({
            emailExist: false,
        })
    }

})


// login user


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    // check if email and password are filled
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }


})

// function for logout user







// get user profile
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})



// generate token jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const findTrip = asyncHandler(async (req, res) => {
    const { deppart, arivee } = req.body;
    if (!deppart || !arivee) {
        res.status(400).json({
            message: 'Please fill all fields'
        });
    }
    const trip = await Trip.find({ deppart, arivee });

    res.send(trip);
    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }
});

const reservation = asyncHandler(async (req, res) => {
    const { tripId, userId } = req.params;
    const trip = await Trip.findById(tripId);
    const user = await User.findById(userId);
    if (trip && user) {
        const ticket = await Ticket.create({
            trip_id: tripId,
            user_id: userId,
        });
        if (!ticket) {
            res.status(400);
            throw new Error('Invalid ticket data');
        }
        res.status(201).json(ticket);
    } else {
        res.status(404);
        throw new Error('Trip or user not found');
    }
});

const getTicket = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
        const ticket = await Ticket.find({ user_id: userId }).populate('trip_id');
        res.json(ticket);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const getAllTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.find({}).populate('car','Numero marque');
    res.json(trip);
});









module.exports = {
    registerUser,
    loginUser,
    getUser,
    findTrip,
    reservation,
    getTicket,
    emailExist,
    getAllTrip
}
