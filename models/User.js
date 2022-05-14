const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
        {
                fullName: { type: String },
                email: { type: String },
                password: { type: String },
                cin: { type: String },
                car: { type: String },
                address: { type: String },
                phone: { type: String },
                photo: { type: String },
                role: { type: String },
                isVerified: { type: Boolean },
            

                reservations: [{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Reservation'
                }],

                parkings: [{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Parking'
                }]
        },
        {
                timestamps: { currentTime: () => Date.now() },
        }
);

module.exports = mongoose.model("User", UserSchema);