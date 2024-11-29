import { Router } from "express";
import { JobController } from "../controllers/jobController";

const router = Router();
const jobController = new JobController();

router.post("/", (req, res) => jobController.createJob(req, res));
router.get("/contract/:contractId", (req, res) => jobController.getJobsByContractId(req, res));
router.put("/:id", (req, res) => jobController.updateJob(req, res));
router.delete("/:id", (req, res) => jobController.deleteJob(req, res));
router.get("/unpaid/:contractId", (req, res) => jobController.listarJobsNaoPagosPorContrato(req, res));


export default router;
