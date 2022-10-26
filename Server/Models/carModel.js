const mongoose = require('mongoose');
const CarSchema = mongoose.Schema({
    matricule: {
        type: String,
        required: [true, 'Please add a matricule'],
    },
    nbPlace: {
        type: Number,
        required: [true, 'Please add a nbPlace'],
    },
    marque: {
        type: String,
        required: [true, 'Please add a marque'],
    },
    Numero: {
        type: Number,
        required: [true, 'Please add a Numero'],
    },

}
    , { timestamps: true }
    
    
);

module.exports = mongoose.model('Car', CarSchema);