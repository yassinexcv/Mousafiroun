const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const Trip = require('../models/tripModel');
const Car = require('../models/carModel');

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill all fields'); 
    }

    //check if u ser exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    // hache password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);



    // create user regester in db
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword
    });

    if(admin){
        res.status(201).json(admin)
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }

 
});

// login admin

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});



// generate token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
} 

// get admin profile

const getAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        })
    } else {
        res.status(404);
        throw new Error('Admin not found');
    }
})

    const addTrip = asyncHandler(async (req, res) => {
        const { deppart, price, arivee, heurDepp,heurariv,car  } = req.body;

        if (!deppart || !arivee || !price || !heurDepp || !heurariv) {
            res.status(400);
            throw new Error('Please fill all fields');
        }

        const trip = await Trip.create({
            deppart,
            arivee,
            price,
            heurDepp,
            heurariv,
            car
        });

        if (trip) {
            res.status(201).json(trip)
        } else {
            res.status(400);
            throw new Error('Invalid trip data');
        }

        //
    });

        const getTrip = asyncHandler(async (req, res) => {
            const trip = await Trip.find().populate('car','Numero marque');
            res.json(trip);
        });


        const findTrip = asyncHandler(async (req, res) => {
            const { deppart, arivee } = req.body;
            if (!deppart || !arivee) {
                res.status(400);
                throw new Error('Please fill all fields');
            }
            const trip = await Trip.find({ deppart, arivee }).populate('car', 'Numero marque');
            if (!trip) {
                res.status(400);
                throw new Error('Invalid trip data');
            }
            res.json(trip);
            
        });


    const addCar = asyncHandler(async (req, res) => {
        const { matricule, nbPlace, marque, Numero } = req.body;

        if (!matricule || !nbPlace || !marque || !Numero) {
            res.status(400);
            throw new Error('Please fill all fields');
        }

        const car = await Car.create({
            matricule,
            nbPlace,
            marque,
            Numero,
           
        });

        if (car) {
            res.status(201).json(car)
        } else {
            res.status(400);
            throw new Error('Invalid car data');
        }
    
    });

    const getCar = asyncHandler(async (req, res) => {
        const car = await Car.find();
        res.json(car);
    });
const findOneCar = asyncHandler(async (req, res) => {
    const { Numero } = req.body;
    if (!Numero) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const car = await Car.find({ Numero });
    if (!car) {
        res.status(400);
        throw new Error('Invalid car data');
    }
    res.json(car);

});

 const updateTrip = asyncHandler(async (req, res) => {
    const { deppart, arivee, price, heurDepp, heurariv, car } = req.body;
    const trip = await Trip.findById(req.params.id);
    if (trip) {
        trip.deppart = deppart || trip.deppart;
        trip.arivee = arivee || trip.arivee;
        trip.price = price || trip.price;
        trip.heurDepp = heurDepp || trip.heurDepp;
        trip.heurariv = heurariv || trip.heurariv;
        trip.car = car || trip.car;
        const updatedTrip = await trip.save();
        res.json(updatedTrip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

const deleteTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (trip) {
        await trip.remove();
        res.json({ message: 'Trip removed' });
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});
const updateCar = asyncHandler(async (req, res) => {
    const { matricule, nbPlace, marque, Numero } = req.body;
    const car = await Car.findById(req.params.id);
    if (car) {
        car.matricule = matricule || car.matricule;
        car.nbPlace = nbPlace || car.nbPlace;
        car.marque = marque || car.marque;
        car.Numero = Numero || car.Numero;
        const updatedCar = await car.save();
        res.json(updatedCar);
    } else {
        res.status(404);
        throw new Error('Car not found');
    }
});

const deleteCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (car) {
        await car.remove();
        res.json({ message: 'Car removed' });
    } else {
        res.status(404);
        throw new Error('Car not found');
    }
});





module.exports = {
    registerAdmin,
    loginAdmin,
    getAdmin,
    addTrip,
    addCar,
    getTrip,
    findTrip,
    getCar,
    findOneCar,
    updateTrip,
    deleteTrip,
    updateCar,
    deleteCar
}




