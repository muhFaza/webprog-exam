<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'deadline_at', 'progress', 'assigned_user_id'];

    public function assignedUser() {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }
}