import express from 'express';
import CourseType from '../models/CourseType';

const router = express.Router();

// POST /api/courses - Tworzenie nowego użytkownika
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const courseType = new CourseType({
      name
    });

    await courseType.save();
    res.status(201).json(courseType);
  } catch (error) {
    res.status(400).json({ message: 'Error creating course type', error });
  }
});

// Pobranie wszystkich kursów
router.get("/", async (req, res) => {
  try {
    const coursesType = await CourseType.find();
    res.json(coursesType);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses type", error });
  }
});

export default router;
