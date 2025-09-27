import React from "react";
import TimetableGenerator from "./components/TimetableGenerator";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <header className="bg-white shadow-md py-4 px-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 tracking-wide">
          Smart Classroom Timetable Generator
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8">
          <TimetableGenerator />
        </div>
      </main>

      <footer className="bg-indigo-700 text-white text-center py-4 mt-12">
        &copy; 2025 Smart Classroom Scheduler
      </footer>
    </div>
  );
}
