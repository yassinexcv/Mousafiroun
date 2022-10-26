const express = require('express');
const router = express.Router();
const {registerAdmin, loginAdmin , getAdmin , addTrip, addCar,getTrip , findTrip , getCar , findOneCar , updateTrip , deleteTrip, updateCar , deleteCar} = require('../controllers/adminController');


// const {protect} = require('../middleware/authMiddleware');
const {protect} = require ('../middleware/adminMiddleware');


//routes
router.post('/',registerAdmin);
router.post('/login',loginAdmin);
router.get('/getadmin', protect ,getAdmin);
router.post('/addtrip' , protect , addTrip);
router.post('/addcar' ,addCar);
router.get('/gettrip' ,getTrip);
router.post('/findtrip' ,findTrip);
router.get('/getcar' ,getCar);
router.post('/findcar' ,findOneCar);
router.put('/updatetrip/:id' ,updateTrip);
router.delete('/deletetrip/:id' ,deleteTrip);
router.put('/updatecar/:id' ,updateCar);
router.delete('/deletecar/:id' ,deleteCar);





module.exports = router;