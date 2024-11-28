import { Router } from "express";
import { DepositController } from "../controllers/depositController";

const router = Router();
const depositController = new DepositController();

router.post("/", (req, res) => depositController.createDeposit(req, res));

router.get("/", (req, res) => depositController.getDeposits(req, res));

router.get("/:id", (req, res) => depositController.getDepositById(req, res));

router.put("/:id", (req, res) => depositController.updateDeposit(req, res));

router.delete("/:id", (req, res) => depositController.deleteDeposit(req, res));

export default router;
