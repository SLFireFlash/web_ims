<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use http\Env\Response;


use App\Models\Product;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    public function AddProduct(ProductRequest $request){        
        
        $data = $request->validated();
        $product = Product::create([
            'vehicle_name' => $data['vehicle_name'],
            'product_name' => $data['product_name'],
            'product_brand' => $data['product_brand'],
            'Quantity' => $data['Quantity'],
            'buying_price' => $data['buying_price'],
            'selling_price' => $data['selling_price']
        ]);

        return response(
            [
                'message' => 'Product Name : ' . $product -> product_name . ' Product Added'
            ],200
            );
   }
}
