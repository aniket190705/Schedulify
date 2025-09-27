import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
export default function App() {
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">
        Welcome to Smart Classroom Scheduler
      </h1>
      <button
        onClick={goToAdmin}
        className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Go to Admin Input Form
      </button>
    </div>
  );
}
