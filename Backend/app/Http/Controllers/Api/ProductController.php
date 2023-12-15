<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use http\Env\Response;


use App\Models\Product;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\RemoveProductRequest;
use App\Http\Requests\UpdatProductRequest;

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
                'message' =>$product -> product_name . ' Added to the database'
            ],200
            );
   }
   public function productCount(Request $request){
        
        $count = Product::count();
        $Quantity = Product::pluck('Quantity');
        $Quantityarray = $Quantity->toArray();

        $maxValue = max($Quantityarray);
        $minValue = min($Quantityarray);

        return response( [
            'productCount' => $count,
            'maxValue' => $maxValue,
            'minValue' => $minValue,

        ],200);
   }
   public function productLoad(Request $request){
        
        $allproducts = Product::paginate(10);
        return response([
            'All_Products'=> $allproducts
        ],200);
   }

   public function UpdateProduct(UpdatProductRequest $request){


   }
   public function RemoveProduct(RemoveProductRequest $request){
        $data = $request->validated();
        $id = $data['id'];
        $product =Product::where('id', $id)->delete();

        return response(
            [
                'message'=>  $product
            ],200
            );
   }
}
