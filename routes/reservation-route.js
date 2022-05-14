const express = require("express");
const User = require("../models/User");

const router = express.Router();
const Reservation = require("../models/Reservation");
const ReservationController = require("../controllers/reservation-controller");
const Parking = require("../models/Parking");

/**
* @swagger
* /api/reservation/:
*   description: The reservations managing API
*   get:
*     summary: get all reservation
*     tags: [Reservations]
*     responses:
*       200:
*         description: The list reservations
*         content:
*           application/json:
*       403:
*         description: user error
*/


/**
* @swagger
* /api/reservation/:
*   description: The reservations managing API
*   post:
*     summary: Add reservation
*     tags: [Reservations]
*     parameters:
*       - in: body
*         name: dateEntre
*         type: date
*       - in: body
*         name: dateSortie
*         type: date
*       - in: body
*         name: disabledPark
*         type: boolean
*       - in: body
*         name: specialGuard
*         type: boolean
*       - in: body
*         name: parking
*         type: string
*       - in: body
*         name: user
*         type: string
*       - in: body
*         name: userFromPark
*         type: string
*     responses:
*       200:
*         description: The list reservations
*         content:
*           application/json:
*       403:
*         description: user error
*/


/**
* @swagger
* /api/reservation/:
*   description: The reservations managing API
*   put:
*     summary: edit reservation
*     tags: [Reservations]
*     parameters:
*       - in: body
*         name: _id
*         type: string
*       - in: body
*         name: dateEntre
*         type: date
*       - in: body
*         name: dateSortie
*         type: date
*       - in: body
*         name: disabledPark
*         type: boolean
*       - in: body
*         name: specialGuard
*         type: boolean
*       - in: body
*         name: parking
*         type: string
*       - in: body
*         name: user
*         type: string
*       - in: body
*         name: userFromPark
*         type: string
*     responses:
*       200:
*         description: The list reservations
*         content:
*           application/json:
*       403:
*         description: user error
*/


/**
* @swagger
* /api/reservation/:
*   description: The reservations managing API
*   delete:
*     summary: Delete reservation
*     tags: [Reservations]
*     parameters:
*       - in: body
*         name: _id
*         type: string
*     responses:
*       200:
*         description: The list reservations
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.route("/")
    .get(ReservationController.getAllReservations)
    .post(ReservationController.addReservation)
    .put(ReservationController.editReservation)
    .delete(ReservationController.deleteReservation);

router.get("/:id",async(req,res)=>{     
    id=req.params.id
    const reservation=await Reservation.find({user:id}).populate('user parking userFromPark')
    if (reservation) {
        console.log(reservation)
        res.status(200).send( reservation);
    } else {
        res.status(403).send({ message: "fail" });
    }
}
)
router.get("/ownermy/:id",async(req,res)=>{     
    console.log("hello")
    id=req.params.id
        const reservation=await Reservation.find({userFromPark:id}).populate('user parking userFromPark')
        if (reservation) {
            console.log(reservation)
            res.status(200).send( reservation);
        } else {
            res.status(403).send({ message: "fail" });
        }
    }
    )


    
/**
* @swagger
* /api/user/owner-my:
*   description: The reservations managing API
*   post:
*     summary: Returns my favories as a owner
*     tags: [Reservations]
*     parameters:
*       - in: body
*         name: user
*         type: string
*     responses:
*       200:
*         description: The list reservation
*         content:
*           application/json:
*       403:
*         description: user error
*/



/**
* @swagger
* /api/user/normal-my:
*   description: The reservations managing API
*   post:
*     summary: Returns my favories as a normal user
*     tags: [Reservations]
*     parameters:
*       - in: body
*         name: user
*         type: string
*     responses:
*       200:
*         description: The list reservation
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.post("/normalmy", ReservationController.getMyReservationsAsNormal)

/**
* @swagger
* /api/reservation/deleteAllReservations:
*   description: The reservations managing API
*   delete:
*     summary: Delete all reservations
*     tags: [Reservations]
*     responses:
*       200:
*         description: The list reservation
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.delete("/deleteAllReservations", ReservationController.deleteAllReservations)

router.post("/by-id", ReservationController.getReservationById)

module.exports = router;