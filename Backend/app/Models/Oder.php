<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oder extends Model
{
    protected $fillable =['product_id' , 'vehicle_id' , 'brand_id' , 'quantity' ,	'user_id' , 'created_at' ,'updated_at'];
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
