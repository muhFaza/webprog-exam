import React, { useState } from "react";
import { useLocation } from "react-router";

const TeamPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamName = queryParams.get("name");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Homepage",
      description: "Create a modern and responsive homepage design.",
      username: "john_doe",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Fix Login Bug",
      description: "Resolve the issue with users unable to log in.",
      username: "jane_smith",
      status: "Completed",
    },
    {
      id: 3,
      title: "Write API Documentation",
      description: "Document the endpoints for the new API.",
      username: "alex_wong",
      status: "Pending",
    },
  ]);

  const [milestones, setMilestones] = useState([
    "Sprint 1: Initial Setup",
    "Sprint 2: Core Features",
  ]);
  const [currentMilestone, setCurrentMilestone] = useState("Sprint 2: Core Features");

  const [newTask, setNewTask] = useState({ title: "", description: "", username: "" });
  const [newMilestone, setNewMilestone] = useState("");

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description || !newTask.username) return;

    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      username: newTask.username,
      status: "Pending",
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", username: "" });
  };

  const handleCreateMilestone = (e) => {
    e.preventDefault();
    if (!newMilestone) return;

    setMilestones([...milestones, newMilestone]);
    setCurrentMilestone(newMilestone);
    setNewMilestone("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">{teamName}</h1>

      {/* Create Task Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
        <form onSubmit={handleCreateTask} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Assigned To (Username)"
              value={newTask.username}
              onChange={(e) => setNewTask({ ...newTask, username: e.target.value })}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Create Task
          </button>
        </form>
      </div>

      {/* Create Milestone Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create Milestone</h2>
        <form onSubmit={handleCreateMilestone} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <input
            type="text"
            placeholder="Milestone Name"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Create Milestone
          </button>
        </form>
      </div>

      {/* Current Milestone */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Milestone</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-medium">{currentMilestone || "No milestone set"}</p>
        </div>
      </div>

      {/* Task List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks available.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border-b border-gray-200 py-4 last:border-b-0">
                  <p className="text-lg font-medium">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-600">Assigned To: {task.username}</p>
                  <p className="text-sm text-gray-600">Status: {task.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;