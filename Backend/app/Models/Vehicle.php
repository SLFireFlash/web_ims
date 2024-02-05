<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    protected $fillable = ['vehicle_name'];

    public function quantities()
    {
        return $this->hasMany(Quantity::class);
    }
}
