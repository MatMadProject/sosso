import express, { Request, Response } from 'express';
import CourseInstance from '../models/CourseInstance';

const router = express.Router();

// Tworzenie nowego kursu
router.post('/', async (req: Request, res: Response) => {
  const { name, courseTypeId , timestampStart, timestampEnd, courseNumber, courseManager } = req.body;

  try {
    const courseCreate = new CourseInstance({
      name,
      courseTypeId,
      timestampStart,
      timestampEnd,
      courseNumber,
      courseManager,
    });

    await courseCreate.save();
    res.status(201).json(courseCreate);
  } catch (error) {
    res.status(400).json({ message: 'Error creating course', error });
  }
});


router.get('/', async (req: Request, res: Response) => {
  try {
    // Pobranie query parameter 'courseTypeId' z zapytania
    const { courseTypeId } = req.query;

    // Tworzymy filtr do zapytania
    const filter: { [key: string]: any } = {};

    // Jeżeli 'courseTypeId' jest przekazany, dodajemy go do filtru
    if (courseTypeId) {
      filter.courseTypeId = courseTypeId;
    }

    // Pobieramy kursy z bazy danych, używając filtru
    const courses = await CourseInstance.find(filter);

    // Jeżeli nie znaleziono żadnych kursów, zwracamy odpowiedni komunikat
    // if (courses.length === 0) {
    //   return res.status(404).json({ message: 'No courses found' });
    // }

    // Zwracamy znalezione kursy
    res.json(courses);
  } catch (error) {
    // Obsługuje błąd, jeśli coś pójdzie nie tak
    res.status(500).json({ message: 'Error fetching courses', error });
  }
});

export default router;
