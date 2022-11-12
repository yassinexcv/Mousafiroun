const express = require('express');
const router = express.Router();
const {registerUser , loginUser, getUser,findTrip,reservation, getTicket,emailExist,getAllTrip} = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware');


//routes
router.post('/',registerUser);
router.post('/login',loginUser);
router.get('/getuser', protect ,getUser);
router.post('/findtrip',findTrip);
router.post('/reservation/:tripId/:userId',reservation);
router.get('/getTicket/:userId',getTicket);
router.post('/emailexist',emailExist);
router.get('/getalltrip',getAllTrip);


module.exports = router;
