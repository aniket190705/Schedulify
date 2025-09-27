import React, { useState } from "react";

export default function AdminInputForm({ onSubmit }) {
  const [courses, setCourses] = useState([
    { id: "", name: "", credits: "", batch: "", type: "mandatory" },
  ]);
  const [batches, setBatches] = useState([{ id: "", students: "" }]);
  const [faculty, setFaculty] = useState([
    {
      id: "",
      name: "",
      expertise: [],
      availability: "",
      maxDaily: "",
      maxWeekly: "",
    },
  ]);
  const [rooms, setRooms] = useState([{ id: "", name: "" }]);
  const [workingDays, setWorkingDays] = useState("");
  const [slotsPerDay, setSlotsPerDay] = useState("");

  const addCourse = () =>
    setCourses([
      ...courses,
      { id: "", name: "", credits: "", batch: "", type: "mandatory" },
    ]);
  const removeCourse = (index) =>
    setCourses(courses.filter((_, i) => i !== index));

  const addBatch = () => setBatches([...batches, { id: "", students: "" }]);
  const removeBatch = (index) =>
    setBatches(batches.filter((_, i) => i !== index));

  const addFaculty = () =>
    setFaculty([
      ...faculty,
      {
        id: "",
        name: "",
        expertise: [],
        availability: "",
        maxDaily: "",
        maxWeekly: "",
      },
    ]);
  const removeFaculty = (index) =>
    setFaculty(faculty.filter((_, i) => i !== index));

  const addRoom = () => setRooms([...rooms, { id: "", name: "" }]);
  const removeRoom = (index) => setRooms(rooms.filter((_, i) => i !== index));

  const courseIds = courses.map((c) => c.id).filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!workingDays || !slotsPerDay) {
      alert("Please fill working days and slots per day");
      return;
    }
    const payload = {
      courses: courses.map(({ credits, ...rest }) => ({
        ...rest,
        credits: Number(credits),
      })),
      batches: batches.map(({ students, ...rest }) => ({
        ...rest,
        students: students ? Number(students) : 0,
      })),
      faculty: faculty.map(({ maxDaily, maxWeekly, expertise, ...rest }) => ({
        ...rest,
        expertise,
        maxDaily: Number(maxDaily),
        maxWeekly: Number(maxWeekly),
      })),
      rooms,
      scheduling: {
        workingDays: Number(workingDays),
        slotsPerDay: Number(slotsPerDay),
      },
    };
    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-12 p-8 bg-white rounded-3xl shadow-2xl max-w-6xl mx-auto border border-indigo-200"
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 border-b border-indigo-300 pb-3">
        Course Details
      </h2>
      {courses.map((course, i) => (
        <div
          key={i}
          className="grid grid-cols-6 gap-4 mb-4 items-center bg-indigo-50 rounded-lg p-4 shadow-sm border border-indigo-100"
        >
          <input
            required
            placeholder="Course ID"
            className="col-span-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={course.id}
            onChange={(e) => {
              const newCourses = [...courses];
              newCourses[i].id = e.target.value.toUpperCase();
              setCourses(newCourses);
            }}
          />
          <input
            required
            placeholder="Course Name"
            className="col-span-2 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={course.name}
            onChange={(e) => {
              const newCourses = [...courses];
              newCourses[i].name = e.target.value;
              setCourses(newCourses);
            }}
          />
          <input
            required
            type="number"
            min="1"
            placeholder="Credits"
            className="col-span-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={course.credits}
            onChange={(e) => {
              const newCourses = [...courses];
              newCourses[i].credits = e.target.value;
              setCourses(newCourses);
            }}
          />
          <input
            placeholder="Batch ID"
            className="col-span-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={course.batch}
            onChange={(e) => {
              const newCourses = [...courses];
              newCourses[i].batch = e.target.value.toUpperCase();
              setCourses(newCourses);
            }}
          />
          <select
            className="col-span-1 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={course.type}
            onChange={(e) => {
              const newCourses = [...courses];
              newCourses[i].type = e.target.value;
              setCourses(newCourses);
            }}
          >
            <option value="mandatory">Mandatory</option>
            <option value="elective">Elective</option>
          </select>
          {courses.length > 1 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                removeCourse(i);
              }}
              className="text-red-600 font-semibold text-xl hover:text-red-800 transition"
              title="Remove Course"
            >
              &times;
            </button>
          )}
        </div>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          addCourse();
        }}
        className="btn-indigo"
      >
        + Add Course
      </button>

      <h2 className="text-3xl font-bold my-6 text-indigo-700 border-b border-indigo-300 pb-3">
        Faculty Details
      </h2>
      {faculty.map((fac, i) => (
        <div
          key={i}
          className="grid grid-cols-8 gap-4 mb-4 items-center bg-indigo-50 rounded-lg p-4 shadow-sm border border-indigo-100"
        >
          <input
            required
            placeholder="Faculty ID"
            className="col-span-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={fac.id}
            onChange={(e) => {
              const newFaculty = [...faculty];
              newFaculty[i].id = e.target.value.toUpperCase();
              setFaculty(newFaculty);
            }}
          />
          <input
            required
            placeholder="Faculty Name"
            className="col-span-2 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={fac.name}
            onChange={(e) => {
              const newFaculty = [...faculty];
              newFaculty[i].name = e.target.value;
              setFaculty(newFaculty);
            }}
          />
          <select
            multiple
            size={Math.min(courseIds.length, 3) || 1}
            className="col-span-2 w-full py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={fac.expertise}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(
                (opt) => opt.value
              );
              const newFaculty = [...faculty];
              newFaculty[i].expertise = selected;
              setFaculty(newFaculty);
            }}
          >
            {courseIds.map((cid) => (
              <option key={cid} value={cid}>
                {cid}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            placeholder="Max classes/day"
            className="col-span-1 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={fac.maxDaily}
            onChange={(e) => {
              const newFaculty = [...faculty];
              newFaculty[i].maxDaily = e.target.value;
              setFaculty(newFaculty);
            }}
          />
          <input
            type="number"
            min="0"
            placeholder="Max classes/week"
            className="col-span-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={fac.maxWeekly}
            onChange={(e) => {
              const newFaculty = [...faculty];
              newFaculty[i].maxWeekly = e.target.value;
              setFaculty(newFaculty);
            }}
          />
          {faculty.length > 1 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFaculty(i);
              }}
              className="text-red-600 font-semibold text-xl hover:text-red-800 transition"
              title="Remove Faculty"
            >
              &times;
            </button>
          )}
        </div>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          addFaculty();
        }}
        className="btn-indigo"
      >
        + Add Faculty
      </button>

      <h2 className="text-3xl font-bold my-6 text-indigo-700 border-b border-indigo-300 pb-3">
        Room Details
      </h2>
      {rooms.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-3 gap-4 mb-4 items-center bg-indigo-50 rounded-lg p-4 shadow-sm border border-indigo-100"
        >
          <input
            required
            placeholder="Room ID"
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={r.id}
            onChange={(e) => {
              const newRooms = [...rooms];
              newRooms[i].id = e.target.value.toUpperCase();
              setRooms(newRooms);
            }}
          />
          <input
            required
            placeholder="Room Name"
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={r.name}
            onChange={(e) => {
              const newRooms = [...rooms];
              newRooms[i].name = e.target.value;
              setRooms(newRooms);
            }}
          />
          {rooms.length > 1 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                removeRoom(i);
              }}
              className="text-red-600 font-semibold text-xl hover:text-red-800 transition"
              title="Remove Room"
            >
              &times;
            </button>
          )}
        </div>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          addRoom();
        }}
        className="btn-indigo"
      >
        + Add Room
      </button>

      <h2 className="text-3xl font-bold my-6 text-indigo-700 border-b border-indigo-300 pb-3">
        Scheduling Settings
      </h2>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <input
          required
          type="number"
          min="1"
          placeholder="Number of working days per week"
          className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg"
          value={workingDays}
          onChange={(e) => setWorkingDays(e.target.value)}
        />
        <input
          required
          type="number"
          min="1"
          placeholder="Number of class slots per day"
          className="px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg"
          value={slotsPerDay}
          onChange={(e) => setSlotsPerDay(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-4 rounded-lg shadow-lg transition"
      >
        Submit Timetable Inputs
      </button>
    </form>
  );
}
