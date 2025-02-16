import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const teamsContainerRef = useRef(null);

  // Check if the user is logged in
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navigate("/login"); // Redirect to login if no token is found
  //     }
  //   }, [navigate]);

  useEffect(() => {
    const teamsContainer = teamsContainerRef.current;
    if (!teamsContainer) return;

    const handleWheel = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        teamsContainer.scrollBy({
          left: event.deltaY < 0 ? -150 : 150,
          behavior: "smooth",
        });
      }
    };

    teamsContainer.addEventListener("wheel", handleWheel);

    return () => {
      teamsContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const teams = [
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
    { id: 4, name: "Team Delta" },
    { id: 5, name: "Team Epsilon" },
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
    { id: 4, name: "Team Delta" },
    { id: 5, name: "Team Epsilon" },
  ];

  const tasks = [
    { id: 1, title: "Design Homepage", status: "In Progress" },
    { id: 2, title: "Fix Login Bug", status: "Completed" },
    { id: 3, title: "Write API Documentation", status: "Pending" },
    { id: 4, title: "Test Payment Gateway", status: "In Progress" },
    { id: 1, title: "Design Homepage", status: "In Progress" },
    { id: 2, title: "Fix Login Bug", status: "Completed" },
    { id: 3, title: "Write API Documentation", status: "Pending" },
    { id: 4, title: "Test Payment Gateway", status: "In Progress" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Teams Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold mb-4">Teams</h2>
          {/* button create team */}
          <button className="bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Create Team
          </button>
        </div>
        <div
          ref={teamsContainerRef}
          className="flex overflow-x-auto space-x-4 pb-4 px-4"
        >
          {teams.map((team) => (
            <Link
              to={`/team?name=${encodeURIComponent(team.name)}`}
              key={team.id}
              className="flex-shrink-0 w-48 h-24 bg-white rounded-lg shadow-md p-4 flex items-center justify-center hover:bg-gray-50 transition duration-300"
            >
              <p className="text-lg font-medium text-center">{team.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        <div className="bg-white rounded-lg shadow-md px-4 min-h-[150px] h-[calc(100vh-400px)] overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border-b border-gray-200 py-3 last:border-b-0"
            >
              <p className="text-lg font-medium">{task.title}</p>
              <p className="text-sm text-gray-600">Status: {task.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
