<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'deadline_at'];

    public function teams() {
        return $this->hasMany(Team::class);
    }
}