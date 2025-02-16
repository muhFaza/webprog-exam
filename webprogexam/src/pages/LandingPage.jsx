import React from "react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to ProjectFlow</h1>
        <p className="text-xl mb-8">
          The ultimate tool to manage your projects, collaborate with your team, and get things done
          efficiently.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-transparent border-2 border-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mt-16 mx-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose ProjectFlow?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Task Management</h3>
            <p className="text-gray-200">
              Organize your tasks, set deadlines, and track progress effortlessly.
            </p>
          </div>
          <div className="bg-gray-700 bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Team Collaboration</h3>
            <p className="text-gray-200">
              Collaborate with your team in real-time and stay on the same page.
            </p>
          </div>
          <div className="bg-gray-700 bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Analytics & Reports</h3>
            <p className="text-gray-200">
              Get insights into your project's performance with detailed analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;