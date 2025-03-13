import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './RootView.css'

interface ICourse {
  _id: string;
  name: string;
}

function App() {
  const [message, setMessage] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courses, setCourses] = useState<ICourse[]>([]);
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    // Przekierowanie do formularza z odpowiednim `courseId`
    navigate(`/course-create/${courseId}`);
  };

    // Pobranie kursów z backendu
  const handleFetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/coursestype");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Pobranie kursów przy starcie aplikacji
  useEffect(() => {
    handleFetchCourses();
  }, []);

  const handleAddCourse = async () => {

    if (!courseName.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/coursestype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: courseName })
      });
      
      const data = await response.json();

      if (response.ok) {
        setMessage(`Course added: ${data.name}`);
        setCourseName("");
        handleFetchCourses(); // Odśwież listę kursów
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error connecting to backend');
    }
  };

  return (
    <div className="container">
      <h1>System Obsługi Szkoleń OSP</h1>
      <h3>Wybierz moduł</h3>
      {courses.map((course) => (
        <button key={course._id} className="course-btn" onClick={() => handleCourseClick(course._id)}>
          {course.name}
        </button>
      ))}
      {/* <p>Message from backend: {message}</p>
      <input
        type="text"
        placeholder="Enter course name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <button onClick={handleAddCourse}>Add Course</button> */}
    </div>
  );
};

export default App;
