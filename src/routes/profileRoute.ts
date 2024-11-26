import { Router } from "express";
import { ProfileController } from "../controllers/profileController";

const router = Router();
const profileController = new ProfileController();


router.post("/", (req, res) => profileController.createProfile(req, res)); 

router.get("/", (req, res) => profileController.getProfiles(req, res));  

router.get("/:id", (req, res) => profileController.getProfileById(req, res)); 

router.put("/:id", (req, res) => profileController.updateProfile(req, res));  

router.delete("/:id", (req, res) => profileController.deleteProfile(req, res)); 

export default router;
