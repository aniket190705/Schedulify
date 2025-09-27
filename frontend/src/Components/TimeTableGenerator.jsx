import React, { useState } from "react";
import axios from "axios";

export default function TimetableGenerator() {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setTimetable(null);

    const data = {
      faculty: [{ id: "f1", name: "Dr. Smith" }],
      rooms: [{ id: "r1", name: "Room 101" }],
      courses: [{ id: "c1", name: "Math", credits: 3 }],
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate",
        data
      );
      setTimetable(response.data.timetable);
    } catch {
      setError("Failed to generate timetable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full px-6 py-3 mb-6 rounded-lg font-semibold 
          text-white transition 
          ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
      >
        {loading ? "Generating timetable..." : "Generate Timetable"}
      </button>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center font-medium">
          {error}
        </div>
      )}

      {timetable ? (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-100">
              <tr>
                {["Course", "Faculty", "Room", "Slot"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wide"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timetable.map((entry, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-50 transition cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {entry.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {entry.faculty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.slot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500 italic">
            Click the button above to generate a timetable.
          </p>
        )
      )}
    </div>
  );
}
