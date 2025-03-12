import express from 'express';
import Course from '../models/Course';

const router = express.Router();

// POST /api/users - Tworzenie nowego użytkownika
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const course = new Course({
      name
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error creating course', error });
  }
});

export default router;
