"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileRoute_1 = __importDefault(require("./routes/profileRoute"));
const depositRoute_1 = __importDefault(require("./routes/depositRoute"));
const jobRoute_1 = __importDefault(require("./routes/jobRoute"));
const contractRoute_1 = __importDefault(require("./routes/contractRoute"));
const paymentRoute_1 = __importDefault(require("./routes/paymentRoute"));
const connection_1 = __importDefault(require("./shared/connection"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
app.get("/", (req, res) => {
    res.status(200).send("Unifio Node.js API - now using ts");
});
app.use("/api/profiles", profileRoute_1.default);
app.use("/api/deposits", depositRoute_1.default);
app.use("/api/contracts", contractRoute_1.default);
app.use("/api/jobs", jobRoute_1.default);
app.use('/api/payment', paymentRoute_1.default);
if (process.env.NODE_ENV !== 'test') {
    (async () => {
        try {
            await connection_1.default.authenticate();
            console.log("Database connected successfully");
            await connection_1.default.sync({ force: false });
            console.log("Models synchronized with the database.");
            app.listen(PORT, () => {
                console.log("Server is running on port", PORT);
            });
        }
        catch (error) {
            console.error("Unable to connect to the database", error);
        }
    })();
}
exports.default = app;
