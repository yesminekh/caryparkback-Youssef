const express = require("express");
const router = express.Router();
let Parking = require("../models/parking")

const ParkingController = require("../controllers/parking-controller");


router.get("/:id",async(req,res)=>{     
    id=req.params.id
    const parking=await Parking.findById(id)
    if (parking) {
        console.log(parking)
        

        
        res.status(200).send(parking);
    } else {
        res.status(403).send({ message: "fail" });
    }
}
)
/**
* @swagger
* /api/parking/:
*   description: The parkings managing API
*   get:
*     summary: get all parking
*     tags: [Parkings]
*     responses:
*       200:
*         description: The list parkings
*         content:
*           application/json:
*       403:
*         description: user error
*/


/**
* @swagger
* /api/parking/:
*   description: The parkings managing API
*   post:
*     summary: Add parking
*     tags: [Parkings]
*     parameters:
*       - in: body
*         name: adresse
*         type: string
*       - in: body
*         name: longitude
*         type: string
*       - in: body
*         name: latitude
*         type: string
*       - in: body
*         name: prix
*         type: string
*       - in: body
*         name: user
*         type: string
*     responses:
*       200:
*         description: The list parkings
*         content:
*           application/json:
*       403:
*         description: user error
*/


/**
* @swagger
* /api/parking/:
*   description: The parkings managing API
*   put:
*     summary: edit parking
*     tags: [Parkings]
*     parameters:
*       - in: body
*         name: _id
*         type: string
*       - in: body
*         name: adresse
*         type: string
*       - in: body
*         name: longitude
*         type: string
*       - in: body
*         name: latitude
*         type: string
*       - in: body
*         name: prix
*         type: string
*       - in: body
*         name: user
*         type: string
*     responses:
*       200:
*         description: The list parkings
*         content:
*           application/json:
*       403:
*         description: user error
*/


/**
* @swagger
* /api/parking/:
*   description: The parkings managing API
*   delete:
*     summary: Delete parking
*     tags: [Parkings]
*     parameters:
*       - in: body
*         name: _id
*         type: string
*     responses:
*       200:
*         description: The list parkings
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.get("/park/:id",async(req,res)=>{     
    id=req.params.id
    const parking=await Parking.find({user:id})
    if (parking) {
        console.log(parking)
        res.status(200).send(parking);
    } else {
        res.status(403).send({ message: "fail" });
    }
}
)

router.route("/")
    .get(ParkingController.getParkings)
    .post(ParkingController.addParking)
    .put(ParkingController.editParking)
    .delete(ParkingController.deleteParking);

/**
* @swagger
* /api/user/owner-my:
*   description: The parkings managing API
*   post:
*     summary: Returns my favories as a owner
*     tags: [Parkings]
*     parameters:
*       - in: body
*         name: _id
*         type: string
*     responses:
*       200:
*         description: The list parking
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.post("/my", ParkingController.getMyParkings)

/**
* @swagger
* /api/user/owner-my:
*   description: The parkings managing API
*   post:
*     summary: Returns my favories as a owner
*     tags: [Parkings]
*     parameters:
*       - in: body
*         name: _id
*         type: string
*     responses:
*       200:
*         description: The list parking
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.post("/withid", ParkingController.getParkingById)

/**
* @swagger
* /api/user/owner-my:
*   description: The parkings managing API
*   post:
*     summary: Returns my favories as a owner
*     tags: [Parkings]
*     parameters:
*       - in: body
*         name: user
*         type: string
*     responses:
*       200:
*         description: The list parking
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.post("/by-id-user", ParkingController.getParkingByUserId)


/**
* @swagger
* /api/parking/deleteAllParkings:
*   description: The parkings managing API
*   delete:
*     summary: Delete all parkings
*     tags: [Parkings]
*     responses:
*       200:
*         description: The list parking
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.delete("/deleteAllParkings", ParkingController.deleteAllParkings)

module.exports = router;