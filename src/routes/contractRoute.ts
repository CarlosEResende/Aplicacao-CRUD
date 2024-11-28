import { Router } from "express";
import { ContractController } from "../controllers/contractController";

const router = Router();
const contractController = new ContractController();

router.post("/", (req, res) => contractController.createContract(req, res));
router.get("/", (req, res) => contractController.getContracts(req, res));
router.get("/:id", (req, res) => contractController.getContractById(req, res));
router.put("/:id", (req, res) => contractController.updateContract(req, res));
router.delete("/:id", (req, res) => contractController.deleteContract(req, res));
router.get("/profile/:profileId", (req, res) => contractController.getContractsByProfileId(req, res));

export default router;
