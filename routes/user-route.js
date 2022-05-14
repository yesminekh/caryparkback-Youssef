const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");

const UserController = require("../controllers/user-controller.js");



router.get("/:id",async(req,res)=>{     
    id=req.params.id
    const user=await User.findById(id)
    if (user) {
        console.log(user)
        

        
        res.status(200).send ();
    } else {
        res.status(403).send({ message: "fail" });
    }
}
)
//....................................
/**
 * 
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the users
 *         email:
 *           type: string
 *           description: email
 *         address:
 *           type: string
 *           description: address
 *         password:
 *           type: string
 *           description: password
 *         phone:
 *           type: string
 *           description: phone
 *         role:
 *           type: string
 *           description: role
 *         idPhoto:
 *           type: string
 *           description: idPhoto
 *
 *
 *       example:
 *         email: test@test.com 
 *         address: Tunis
 *         password: 12345678
 *         phone: 12345678
 *         role: Student
 *         idPhoto: null
 */



/**
* @swagger
* /api/user/:
*   description: The users managing API
*   get:
*     summary: Returns the list of all the users
*     tags: [Users]
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.get("/", UserController.getAllUsers);


/**
* @swagger
* /api/user/signup:
*   description: The users managing API
*   post:
*     summary: Signup
*     tags: [Users]
*     parameters:
*       - in: body
*         name: id
*         type: string
*       - in: body
*         name: email
*         type: string
*       - in: body
*         name: address
*         type: string
*       - in: body
*         name: password
*         type: string
*       - in: body
*         name: phone
*         type: string
*       - in: body
*         name: role
*         type: string
*       - in: body
*         name: idPhoto
*         type: string
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
const picsPath = require("path").resolve(__dirname, "../uploads");

router.get("/download/:nom", function(req, res) {
    let nom = req.params.nom;
    const file = picsPath + "/" + nom;
    console.log(file, "hy");
    res.sendFile(file); // Set disposition and send it.
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        var filetype = "";
        var fileExtension = "";
        if (file.mimetype === "image/gif") {
            filetype = "image-";
            fileExtension = "gif";
        }
        if (file.mimetype === "image/png") {
            filetype = "image-";
            fileExtension = "png";
        }
        if (file.mimetype === "image/jpeg") {
            filetype = "image-";
            fileExtension = "jpeg";
        }
        if (file.mimetype === "image/jpg") {
            filetype = "image-";
            fileExtension = "jpg";
        }

        cb(null, filetype + Date.now() + "." + fileExtension);
        h = cb;
    },
});
var upload = multer({
    storage: storage,
});
router.post("/signup", upload.single("file"), UserController.signup);


/**
* @swagger
* /api/user/login:
*   description: The users managing API
*   post:
*     summary: Login
*     tags: [Users]
*     parameters:
*       - in: body
*         name: email
*         type: string
*       - in: body
*         name: password
*         type: string
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.post("/login", UserController.login)

/**
* @swagger
* /api/user/login:
*   description: The users managing API
*   post:
*     summary: Get user from token
*     tags: [Users]
*     parameters:
*       - in: body
*         name: userToken
*         type: string
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.post("/getUserFromToken", UserController.getUserFromToken)

/**
* @swagger
* /api/user/loginWithSocialApp:
*   description: The users managing API
*   post:
*     summary: Login with social app
*     tags: [Users]
*     parameters:
*       - in: body
*         name: email
*         type: string
*       - in: body
*         name: name
*         type: string
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.post("/loginWithSocialApp", UserController.loginWithSocialApp);

/**
* @swagger
* /api/user/confirmation:
*   description: The users managing API
*   get:
*     summary: Confirm email with token
*     tags: [Users]
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.get("/confirmation/:token", UserController.confirmation);


router.post("/resendConfirmation", UserController.resendConfirmation);

/**
* @swagger
* /api/user/resendConfirmation:
*   description: The users managing API
*   post:
*     summary: Resend email confirmation
*     tags: [Users]
*     parameters:
*       - in: body
*         name: email
*         type: string
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.post("/forgotPassword", UserController.forgotPassword);

/**
* @swagger
* /api/user/editPassword:
*   description: The users managing API
*   put:
*     summary: Edit password
*     tags: [Users]
*     parameters:
*       - in: body
*         name: email
*         type: string
*       - in: body
*         name: newPassword
*         type: string
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.put("/editPassword", UserController.editPassword);

/**
* @swagger
* /api/user/editProfile:
*   description: The users managing API
*   put:
*     summary: Edit profile
*     tags: [Users]
*     parameters:
*       - in: body
*         name: email
*         type: string
*       - in: body
*         name: newPassword
*         type: string
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.put("/editProfile", UserController.editProfile);

router.post("/editProfilePic", upload.single('image') , UserController.editProfilePic);

/**
* @swagger
* /api/user/editProfile:
*   description: The users managing API
*   delete:
*     summary: Delete user
*     tags: [Users]
*     parameters:
*       - in: body
*         name: _id
*         type: string
*     responses:
*       200:
*         description: The list users
*         content:
*           application/json:
*       403:
*         description: user error
*/
router.delete("/deleteOne", UserController.deleteOne);

router.delete("/deleteAll", UserController.deleteAll)

module.exports = router;
