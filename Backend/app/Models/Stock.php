<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'vehicle_id', 'brand_id', 'quantity', 'buying_price', 'selling_price'];

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
    
}
