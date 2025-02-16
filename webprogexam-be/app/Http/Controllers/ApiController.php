<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // For authentication
use Illuminate\Support\Facades\Hash; // For password hashing
use App\Models\User;
use App\Models\Team;
use App\Models\Task;
use App\Models\Milestone;
use App\Models\TeamMember;
use Illuminate\Support\Facades\Mail; // For email sending

class ApiController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // JWT Token generation (Simplified - replace with a proper JWT library)
            $token = base64_encode($user->id); // Example: Encoding user ID

            return response()->json(['token' => $token, 'user_id' => $user->id, 'message' => 'Login successful']);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password
        ]);

        return response()->json(['message' => 'User registered successfully', 'user_id' => $user->id]);
    }

    public function createTeam(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'manager_user_id' => 'required|exists:users,id',
            'milestone_name' => 'required',
            'milestone_deadline' => 'required|date',
            'member_ids' => 'required|array', // Array of user IDs
        ]);

        // Create Milestone
        $milestone = Milestone::create([
            'name' => $request->milestone_name,
            'deadline_at' => $request->milestone_deadline,
        ]);

        // Create Team
        $team = Team::create([
            'name' => $request->name,
            'description' => $request->description,
            'manager_user_id' => $request->manager_user_id,
            'milestone_id' => $milestone->id,
        ]);

        // Add Team Members (including the manager)
        $memberIds = $request->member_ids;
        $memberIds[] = $request->manager_user_id; // Ensure manager is included
        $team->members()->attach(array_unique($memberIds)); // Use array_unique to avoid duplicates

        return response()->json(['message' => 'Team created successfully', 'team_id' => $team->id]);
    }

    public function createTask(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'deadline_at' => 'required|date',
            'assigned_user_id' => 'required|exists:users,id',
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'deadline_at' => $request->deadline_at,
            'assigned_user_id' => $request->assigned_user_id,
        ]);

        // Send Email (using Nodemailer - you'll need to set it up)
        // Mail::raw("You have a new task: {$task->title}", function ($message) use ($task) {
        //     $message->to($task->assignedUser->email)->subject('New Task Assigned');
        // });

        return response()->json(['message' => 'Task created successfully', 'task_id' => $task->id]);
    }

    public function updateTask(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $request->validate([
            'title' => 'required_if:description,null|string', // Allow null for description if title is provided
            'description' => 'required_if:title,null|string', // Allow null for title if description is provided
            'deadline_at' => 'date|nullable', // Make deadline optional
            'progress' => 'in:pending,in progress,completed|nullable', // Validate progress enum
            'assigned_user_id' => 'exists:users,id|nullable', // Make assigned user optional
        ]);

        // Update fields that are present in the request
        if ($request->has('title')) {
            $task->title = $request->title;
        }
        if ($request->has('description')) {
            $task->description = $request->description;
        }
        if ($request->has('deadline_at')) {
            $task->deadline_at = $request->deadline_at;
        }
        if ($request->has('progress')) {
            $task->progress = $request->progress;
        }
        if ($request->has('assigned_user_id')) {
            $task->assigned_user_id = $request->assigned_user_id;
        }

        $task->save();

        return response()->json(['message' => 'Task updated successfully', 'task_id' => $task->id]);
    }
}