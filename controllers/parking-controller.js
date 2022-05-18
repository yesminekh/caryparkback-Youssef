let Parking = require("../models/parking")
const User = require("../models/User")

exports.getParkings = async (req, res) => {
    const parkings = await Parking.find()

    res.status(201).send(parkings) 
}

exports.getMyParkings = async (req, res) => {
    let parkings = await Parking.find({ user : req.body.user }).populate("user reservations")

    res.status(201).send({ parkings, message: "Success" })
}

exports.getParkingById = async (req, res) => {
    res.status(201).send({ parking: await Parking.findById(req.body._id).populate("user reservations"), message: "Success" })
}

exports.getParkingByUserId = async (req, res) => {
    res.status(201).send({ parking: await Parking.findOne({ idUser : req.body.idUser }).populate("user reservations"), message: "Success" })
}

exports.addParking = async (req, res) => {
    console.log(req.body)
    const { adresse, nbrPlace, longitude, latitude, prix, user } = req.body;
   const veriferParking= await Parking.findOne({latitude,longitude});
    if(veriferParking){
        console.log("parking unvailable")
        res.status(403).send({ message: "User already exists !" });

    }else{

        
    const newParking = new Parking();

    newParking.adresse = adresse;
    newParking.nbrPlace = nbrPlace;
    newParking.longitude = longitude;
    newParking.latitude = latitude;
    newParking.prix = prix;
    newParking.user = user;

    await User.findOneAndUpdate(
        { _id: user },
        {
            user: [newParking._id]
        }
    );

    newParking.save();

    res.status(201).send({ parking: "success", parking: newParking });
    }

};

exports.editParking = async (req, res) => {
    const { _id, adresse, nbrPlace, longitude, latitude, prix } = req.body;

    let parking = await Parking.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                adresse: adresse,
                nbrPlace: nbrPlace,
                longitude: longitude,
                latitude: latitude,
                prix: prix
            }
        }
    );

    res.status(201).send({ parking: "success", parking: parking });
};

exports.deleteParking = async (req, res) => {
    const parking = await Parking.findById(req.body._id).remove()
    res.status(201).send({ parking: "success", parking: parking });
}

exports.deleteAllParkings = async (req, res) => {
    Parking.remove({}, function (err, parking) {
        if (err) { return handleError(res, err); }
        return res.status(204).send({ parking: "No data" });
    })
}