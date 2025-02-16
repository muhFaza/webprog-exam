<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'manager_user_id', 'description', 'milestone_id'];

    public function manager() {
        return $this->belongsTo(User::class, 'manager_user_id');
    }

    public function members() {
        return $this->belongsToMany(User::class, 'team_members');
    }

    public function milestone() {
        return $this->belongsTo(Milestone::class);
    }
}