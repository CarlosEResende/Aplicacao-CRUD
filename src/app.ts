import express from "express";
import profileRoutes from "./routes/profileRoute"; 
import depositRoutes from "./routes/depositRoute"; 
import contractRoutes from "./routes/contractRoute";
import sequelize from "./shared/connection"; 


const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send("Unifio Node.js API - now using ts");
});

app.use("/api/profiles", profileRoutes); 
app.use("/api/deposits", depositRoutes); 
app.use("/contracts", contractRoutes); 


if (process.env.NODE_ENV !== 'test') {
    (async () => {
        try {
            await sequelize.authenticate();
            console.log("Database connected successfully");

            await sequelize.sync({ force: false });
            console.log("Models synchronized with the database.");

            app.listen(PORT, () => {
                console.log("Server is running on port", PORT);
            });
        } catch (error) {
            console.error("Unable to connect to the database", error);
        }
    })();
}

export default app;
