import express from "express";
import cors from "cors";
import connectDB from './config/db';
import courseTypeRoutes from './routes/courseTypeRoutes';
import courseInstanceRoutes from './routes/courseInstanceRoutes';

const app: express.Application = express();
const PORT = 5000;

// Połącz z bazą danych
connectDB();

app.use(cors()); 
app.use(express.json()); 

// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "Backend is running!" });
// });
app.use('/api/coursestype', courseTypeRoutes);
app.use('/api/courses', courseInstanceRoutes);


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
