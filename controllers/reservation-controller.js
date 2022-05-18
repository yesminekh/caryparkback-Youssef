const Parking = require("../models/parking");
const Reservation = require("../models/Reservation");
const User = require("../models/User");

exports.getReservation=async(req,res)=>{
    id=req.params._id
    const reservation=await Reservation.find({user:id})
    if (reservation) {
        res.status(200).send(reservation);
    } else {
        res.status(403).send({ message: "fail" });
    }

}

exports.getAllReservations = async (req, res) => {
    const reservations = await Reservation.find().populate({ path: "parking user userFromPark" })

    if (reservations) {
        res.status(200).send({ reservations, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }
};

exports.getMyReservationsAsOwner = async (req, res) => {
    console.log("hllo")
    console.log(req.body)
    const reservations = await Reservation.find({ userFromPark: req.body.user }).populate( "parking user userFromPark" )

    if (reservations) {
        res.status(200).send({ reservations, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }
    /*Parking.find({ user: req.body.user }).then(function (parkings) {

        parkings.forEach(function (parking) {
            Reservation.find({ parking: parking._id }).populate({ path: "parking user" }).then(function (reservations) {
                reservations.forEach(function (reservation) {
                    reservationsaArray = reservation
                });
            })
            console.log(reservationsaArray)
        });
        return Promise.all(reservationsaArray);
    }).then(function (reservationsaArray) {
        res.send({ reservationsaArray });
    }).catch(function (error) {
        res.status(500).send('one of the queries failed', error);
    });*/
};

exports.getMyReservationsAsNormal = async (req, res) => {
    console.log(req.body)

    const reservations = await Reservation.find({ user: req.body.user }).populate({ path: "parking user userFromPark" })
    if (reservations) {
        res.status(200).send({ reservations, message: "success" });
    } else {
        res.status(403).send({ message: "fail" });
    }
};

exports.getReservation = async (req, res) => {
    res.status(201).send({ reservation: await Reservation.find(), message: "Success" })
}

exports.getReservationById = async (req, res) => {
    console.log(req.body)

    let reservationVerif = await Reservation.findById(req.body._id)
    
    if (reservationVerif.userFromPark == req.body.userFromPark) {
        let reservation = await Reservation.findById(req.body._id).populate({ path: "parking user userFromPark" })
        res.status(201).send({ reservation , message: "Success" })
    } else {
        res.status(404).send({ message: "Not valid" })
    }
}

exports.addReservation = async (req, res) => {
    const { dateEntre, dateSortie, parking, user, userFromPark,disabledPark,specialGuard } = req.body;
    console.log(req.body)

    const newReservation = new Reservation();

    newReservation.dateEntre = dateEntre;
    newReservation.dateSortie = dateSortie;
    newReservation.disabledPark=disabledPark
    newReservation.specialGuard=specialGuard
    newReservation.parking = parking;
    newReservation.user = user;
    newReservation.userFromPark = userFromPark

    await Parking.findOneAndUpdate(
        { _id: parking },
        {
            $push: {
                reservations: [newReservation._id]
            }
        }
    );

    await User.findOneAndUpdate(
        { _id: user },
        {
            $push: {
                reservations: [newReservation._id]
            }
        }
    );

    await User.findOneAndUpdate(
        { _id: userFromPark },
        {
            $push: {
                reservations: [newReservation._id]
            }
        }
    );

    newReservation.save()

    res.status(201).send({ message: "success", reservation: newReservation });
}

exports.editReservation = async (req, res) => {
    const { _id, dateEntre, dateSortie, parking } = req.body;

    let reservation = await Reservation.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                title: dateEntre,
                title: dateSortie,
                //description: parking
            }
        }
    );

    res.status(201).send({ reservation: "success", reservation: reservation });
};

exports.deleteReservation = async (req, res) => {
    const reservation = await Reservation.findById(req.body._id).remove()
    res.status(201).send({ reservation: "success", reservation: reservation });
}

exports.deleteAllReservations = async (req, res) => {
    Reservation.remove({}, function (err, reservation) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ reservation: "No data" });
    })
}