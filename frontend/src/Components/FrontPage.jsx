import React, { useState } from "react";
import {
  Calendar,
  Users,
  BookOpen,
  Clock,
  Play,
  Download,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Settings,
} from "lucide-react";

const TimetableGenerator = () => {
  const [currentView, setCurrentView] = useState("setup"); // 'setup' or 'generate'
  const [departmentData, setDepartmentData] = useState({
    name: "Computer Science",
    sections: ["CS-A", "CS-B", "CS-C"],
    teachers: [],
    subjects: [],
    timeSlots: [
      "9:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "1:00-2:00",
      "2:00-3:00",
      "3:00-4:00",
      "4:00-5:00",
    ],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  });

  const [selectedSection, setSelectedSection] = useState("CS-A");
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form states
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subjects: [],
    classesPerWeek: {},
  });
  const [newSubject, setNewSubject] = useState("");
  const [newSection, setNewSection] = useState("");

  // Add Subject
  const addSubject = () => {
    if (newSubject && !departmentData.subjects.includes(newSubject)) {
      setDepartmentData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, newSubject],
      }));
      setNewSubject("");
    }
  };

  // Add Section
  const addSection = () => {
    if (newSection && !departmentData.sections.includes(newSection)) {
      setDepartmentData((prev) => ({
        ...prev,
        sections: [...prev.sections, newSection],
      }));
      setNewSection("");
    }
  };

  // Add Teacher
  const addTeacher = () => {
    if (newTeacher.name && newTeacher.subjects.length > 0) {
      const teacher = {
        id: Date.now(),
        name: newTeacher.name,
        subjects: newTeacher.subjects,
        classesPerWeek: newTeacher.classesPerWeek,
      };

      setDepartmentData((prev) => ({
        ...prev,
        teachers: [...prev.teachers, teacher],
      }));

      setNewTeacher({ name: "", subjects: [], classesPerWeek: {} });
    }
  };

  // Handle subject assignment to teacher
  const handleSubjectToggle = (subject) => {
    const isSelected = newTeacher.subjects.includes(subject);

    if (isSelected) {
      setNewTeacher((prev) => ({
        ...prev,
        subjects: prev.subjects.filter((s) => s !== subject),
        classesPerWeek: { ...prev.classesPerWeek, [subject]: undefined },
      }));
    } else {
      setNewTeacher((prev) => ({
        ...prev,
        subjects: [...prev.subjects, subject],
        classesPerWeek: { ...prev.classesPerWeek, [subject]: 3 },
      }));
    }
  };

  // Handle classes per week change
  const handleClassesPerWeekChange = (subject, classes) => {
    setNewTeacher((prev) => ({
      ...prev,
      classesPerWeek: {
        ...prev.classesPerWeek,
        [subject]: parseInt(classes) || 0,
      },
    }));
  };

  // Simple timetable generation (hardcoded for demo)
  const generateTimetable = () => {
    if (departmentData.teachers.length === 0) {
      alert("Please add teachers first!");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const timetable = {};

      // Initialize empty timetable
      departmentData.days.forEach((day) => {
        timetable[day] = {};
        departmentData.timeSlots.forEach((slot) => {
          timetable[day][slot] = null;
        });
      });

      // Simple algorithm: distribute classes randomly (demo purposes)
      const allSlots = [];
      departmentData.days.forEach((day) => {
        departmentData.timeSlots.forEach((slot) => {
          allSlots.push({ day, slot });
        });
      });

      let slotIndex = 0;
      departmentData.teachers.forEach((teacher) => {
        teacher.subjects.forEach((subject) => {
          const classesNeeded = teacher.classesPerWeek[subject] || 0;
          for (
            let i = 0;
            i < classesNeeded && slotIndex < allSlots.length;
            i++
          ) {
            const { day, slot } = allSlots[slotIndex];
            if (!timetable[day][slot]) {
              timetable[day][slot] = {
                subject: subject,
                teacher: teacher.name,
              };
              slotIndex++;
            }
          }
        });
      });

      setGeneratedTimetable(timetable);
      setIsGenerating(false);
    }, 2000);
  };

  const getSubjectColor = (subject) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-red-100 text-red-800",
      "bg-yellow-100 text-yellow-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
      "bg-teal-100 text-teal-800",
      "bg-cyan-100 text-cyan-800",
    ];
    const index = departmentData.subjects.indexOf(subject) % colors.length;
    return colors[index] || "bg-gray-100 text-gray-800";
  };

  // Setup View
  if (currentView === "setup") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Settings className="h-7 w-7 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-800">
                  Admin Setup
                </h1>
              </div>
              <p className="text-gray-600">
                Configure department, teachers, and subjects
              </p>
            </div>
            <button
              onClick={() => setCurrentView("generate")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Go to Generator</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department & Sections */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Department & Sections
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Name
              </label>
              <input
                type="text"
                value={departmentData.name}
                onChange={(e) =>
                  setDepartmentData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Section
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  placeholder="e.g., CS-A"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={addSection}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Current Sections ({departmentData.sections.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {departmentData.sections.map((section) => (
                    <span
                      key={section}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Subjects
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Subject
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g., Data Structures"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={addSubject}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Current Subjects ({departmentData.subjects.length})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {departmentData.subjects.map((subject) => (
                  <div
                    key={subject}
                    className="bg-gray-50 p-2 rounded flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">{subject}</span>
                    <button
                      onClick={() => {
                        setDepartmentData((prev) => ({
                          ...prev,
                          subjects: prev.subjects.filter((s) => s !== subject),
                        }));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Teacher */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Add Teacher
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teacher Name
                </label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={(e) =>
                    setNewTeacher((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Dr. John Smith"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign Subjects
                </label>
                <div className="border border-gray-300 rounded p-3 max-h-32 overflow-y-auto">
                  {departmentData.subjects.length === 0 ? (
                    <p className="text-gray-500 text-sm">Add subjects first</p>
                  ) : (
                    departmentData.subjects.map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center justify-between mb-2"
                      >
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newTeacher.subjects.includes(subject)}
                            onChange={() => handleSubjectToggle(subject)}
                            className="mr-2"
                          />
                          <span className="text-sm">{subject}</span>
                        </label>
                        {newTeacher.subjects.includes(subject) && (
                          <input
                            type="number"
                            min="1"
                            max="7"
                            value={newTeacher.classesPerWeek[subject] || 3}
                            onChange={(e) =>
                              handleClassesPerWeekChange(
                                subject,
                                e.target.value
                              )
                            }
                            className="w-16 border border-gray-300 rounded px-2 py-1 text-xs"
                            placeholder="3"
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={addTeacher}
              disabled={!newTeacher.name || newTeacher.subjects.length === 0}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Teacher</span>
            </button>
          </div>

          {/* Teachers List */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Teachers ({departmentData.teachers.length})
            </h2>

            {departmentData.teachers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No teachers added yet
              </p>
            ) : (
              <div className="space-y-4">
                {departmentData.teachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {teacher.name}
                      </h3>
                      <button
                        onClick={() => {
                          setDepartmentData((prev) => ({
                            ...prev,
                            teachers: prev.teachers.filter(
                              (t) => t.id !== teacher.id
                            ),
                          }));
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="mb-1">
                        Subjects: {teacher.subjects.join(", ")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {teacher.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="bg-gray-100 px-2 py-1 rounded text-xs"
                          >
                            {subject}: {teacher.classesPerWeek[subject]}{" "}
                            classes/week
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Generator View
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="h-7 w-7 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-800">
                Timetable Generator
              </h1>
            </div>
            <p className="text-gray-600">{departmentData.name} Department</p>
          </div>
          <button
            onClick={() => setCurrentView("setup")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Back to Setup</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Section
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {departmentData.sections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <button
                  onClick={generateTimetable}
                  disabled={isGenerating}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  {isGenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  <span>
                    {isGenerating ? "Generating..." : "Generate Timetable"}
                  </span>
                </button>

                {generatedTimetable && (
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {departmentData.teachers.length} Teachers
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {departmentData.sections.length} Sections
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timetable Display */}
        {generatedTimetable ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Generated Timetable - Section {selectedSection}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">
                      Time
                    </th>
                    {departmentData.days.map((day) => (
                      <th
                        key={day}
                        className="px-4 py-3 text-center text-sm font-medium text-gray-600 border-b"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {departmentData.timeSlots.map((slot) => (
                    <tr key={slot} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 bg-gray-50">
                        <Clock className="h-4 w-4 inline mr-2" />
                        {slot}
                      </td>
                      {departmentData.days.map((day) => (
                        <td
                          key={`${day}-${slot}`}
                          className="px-4 py-4 text-center"
                        >
                          {generatedTimetable[day] &&
                          generatedTimetable[day][slot] ? (
                            <div
                              className={`inline-block px-3 py-2 rounded-lg text-xs font-medium ${getSubjectColor(
                                generatedTimetable[day][slot].subject
                              )}`}
                            >
                              <div className="font-semibold">
                                {generatedTimetable[day][slot].subject}
                              </div>
                              <div className="text-xs opacity-75 mt-1">
                                {generatedTimetable[day][slot].teacher}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">Free</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No Timetable Generated
            </h3>
            <p className="text-gray-500">
              Click "Generate Timetable" to create a schedule for the selected
              section
            </p>
          </div>
        )}

        {/* Teacher Summary */}
        {generatedTimetable && departmentData.teachers.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Teacher Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departmentData.teachers.map((teacher) => {
                const totalClasses = Object.values(
                  teacher.classesPerWeek
                ).reduce((sum, classes) => sum + classes, 0);
                return (
                  <div
                    key={teacher.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="font-medium text-gray-900">
                      {teacher.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {teacher.subjects.join(", ")}
                    </p>
                    <p className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block">
                      {totalClasses} classes/week
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableGenerator;
