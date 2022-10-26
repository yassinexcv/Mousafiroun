const mongoose = require('mongoose');

const TripSchema = mongoose.Schema({
    deppart: {
        type: String,
        required: [true, 'ajouter le point de depart'],
    },
    arivee: {
        type: String,

        required: [true, 'jouter le point d arrivé'],
    },
    price: {
        type: Number,
        required: [true, 'ajouter un prix'],
    },
    heurDepp: {
        type: String,
        required: [true, 'ajouter une heure de depart'],
    },
    heurariv: {
        type: String,
        required: [true, 'ajouter une heure d arrivée'],
    },
    car:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
    }

   
}
    , { timestamps: true }
    
    );

module.exports = mongoose.model('Trip', TripSchema);
