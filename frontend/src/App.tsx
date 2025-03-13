import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootView from './RootView';
import CourseCreateForm from './CourseCreateForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootView />} />
        <Route path="/course-create/:courseId" element={<CourseCreateForm />} />
      </Routes>
    </Router>
  );
};

export default App;
