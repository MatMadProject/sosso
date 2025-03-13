import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from 'react-router-dom';

interface ICourseCreate{
    _id: string;
    name: string;
    courseTypeId: string;
    courseId: string;
    timestampStart: Date;
    timestampEnd: Date;
    courseNumber: string;
    courseManager: string;
  }

const CourseCreateForm = () => {
  const [courseCreated, setCourseCreated] = useState<ICourseCreate[]>([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    trainingNumber: "",
    trainingManager: "",
  });
  const { courseId } = useParams<{ courseId: string }>();
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses?courseTypeId=${courseId}`)
      .then((response) => response.json())
      .then((data) => setCourseCreated(data))
      .catch((error) => console.error("Error fetching trainings:", error));
  }, []);

  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newCourseCreated = await response.json();
      setCourseCreated([...courseCreated, newCourseCreated]);
      setFormData({ startDate: "", endDate: "", trainingNumber: "", trainingManager: "" });
    } catch (error) {
      console.error("Error adding training:", error);
    }
  };

  return (
    <div className="container">
      <h1>Tworzenie szkolenia</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        <input type="text" name="trainingNumber" placeholder="Nr szkolenia" value={formData.trainingNumber} onChange={handleChange} required />
        <input type="text" name="trainingManager" placeholder="Kierownik szkolenia" value={formData.trainingManager} onChange={handleChange} required />
        <button type="submit">Utwórz</button>
      </form>
      <h2>Lista szkoleń</h2>
      <ul>
        {courseCreated.map((courseCreate) => (
          <li key={courseCreate._id}>
            {courseCreate.courseNumber} - {courseCreate.courseManager} ({new Date(courseCreate.timestampStart).toLocaleDateString()} - {new Date(courseCreate.timestampEnd).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseCreateForm;
