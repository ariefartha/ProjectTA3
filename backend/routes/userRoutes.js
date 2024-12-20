import express from 'express'
import { signupUser, loginUser, logoutUser, getAllUser, deleteUser, getUserById, updateUserById, loginWithGoogle, updateMyProfile, AddInstructure, getAllInstructure, uploadUserCertificate, deleteCertificate} from '../controllers/userController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get("/getalluser", getAllUser);
router.get("/getallinstructure", getAllInstructure)
router.get("/getuserbyid/:id", getUserById);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/google", loginWithGoogle);
router.post("/addinstructure", AddInstructure);
router.post("/logout", logoutUser);
router.put("/update/:id", updateUserById);
router.put("/uploadcertificate/:id", uploadUserCertificate);
router.put("/updatemyprofile/:id", protectRoute, updateMyProfile);
router.delete("/delete/:id", deleteUser);
router.delete("/deletecertificate/:id", deleteCertificate);

export default router;