<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // For authentication

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = ['username', 'email', 'password']; // Mass assignable

    public function teams() {
        return $this->belongsToMany(Team::class, 'team_members'); // Many-to-many with teams
    }

    public function managedTeams() {
        return $this->hasMany(Team::class, 'manager_user_id'); // Teams user manages
    }

    public function tasks() {
        return $this->hasMany(Task::class, 'assigned_user_id'); // User's tasks
    }
}