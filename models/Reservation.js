const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
    {
        dateEntre: { type: String },
        dateSortie: { type: String },
        disabledPark: { type: Boolean },
        specialGuard: { type: Boolean },

        parking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Parking"
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        userFromPark: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model("Reservation", ReservationSchema);