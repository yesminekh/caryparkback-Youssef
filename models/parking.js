const mongoose = require("mongoose");
const Reservation = require("./Reservation");

const ParkingSchema = new mongoose.Schema(
    {
        adresse: { type: String },
        nbrPlace: { type: Number },
        longitude: { type: Number },
        latitude: { type: Number },
        prix: { type: Number },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        reservations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reservation'
        }]
    },
    {
        verification: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model("Parking", ParkingSchema);