import express, { Request, Response} from "express";
import cors from "cors";
import connectDB from './config/db';
import courseRoutes from './routes/courseRoutes';

const app = express();
const PORT = 5000;

// Połącz z bazą danych
connectDB();

app.use(cors()); 
app.use(express.json()); 

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend is running!" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

app.use('/api/courses', courseRoutes);
