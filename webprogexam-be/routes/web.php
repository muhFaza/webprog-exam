<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

Route::get('/', function () {
    return view('welcome');
});
Route::post('/login', [ApiController::class, 'login']);
Route::post('/register', [ApiController::class, 'register']);

// Routes that might require authentication (if you add auth middleware later)
Route::post('/team', [ApiController::class, 'createTeam']);
Route::post('/task', [ApiController::class, 'createTask']);
Route::put('/task/{id}', [ApiController::class, 'updateTask']); // {id} is a route parameter
// Route::group(['middleware' => ['cors']], function () {  // 'api' middleware for JSON responses

//     // ... other routes as needed
// });