import express from "express";
import reviewRoutes from "./routes/reviewRoutes";
import userRoutes from "./routes/userRoutes";
import movieRoutes from "./routes/movieRoutes";

const app = express();

app.use(express.json());

app.use("/", reviewRoutes);
app.use("/", userRoutes);
app.use("/", movieRoutes);

app.listen(3004, () => "Servidor rodando no port 3004");
