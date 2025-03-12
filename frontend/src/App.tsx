import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [message, setMessage] = useState('');
  const [courseName, setCourseName] = useState('');

  const handleAddCourse = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: courseName })
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage(`Course added: ${data.name}`);
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
      <h4>Wybierz moduł</h4>
      <p>Message from backend: {message}</p>
      <input
        type="text"
        placeholder="Enter course name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <button onClick={handleAddCourse}>Add Course</button>
    </div>
  );
};

export default App;
