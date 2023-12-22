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
        $data = $request->validated();
        $affectedRows = Product::where("id", $data['id'])->update(
                        [
                            "Quantity" => $data['Quantity'],
                            "buying_price" => $data['buying_price'],
                            "product_brand" => $data['product_brand'],
                            "product_name" => $data['product_name'],
                            "selling_price" => $data['selling_price'],
                            "vehicle_name" => $data['vehicle_name'],
                        ]);

        if($affectedRows >0){
            return response([
                'message'=>"Product Data Updated"
            ],200);        
        }else{
            return response([
                'message' => "Something went wrong"
            ],404);
        }


   }
   public function RemoveProduct(RemoveProductRequest $request){
        $data = $request->validated();
        $id = $data['id'];
        $affectedRows =Product::where('id', $id)->delete();
        if($affectedRows > 0){
            return response(
                [
                    'message'=>'Product Removed Successful'
                ],200
                );
        }else{
            return response(
                [
                    'message'=>'Product Removed UnSuccessful'
                ],404
                );
        }


   }
   public function ProductSearch(Request $request ){
    $ProdcutName = $request['ProductName'];
    $VehicleName =$request['VehicleName'];
    $brand =$request['Brand'];
    $SearchResult ='';

    // if($ProdcutName != null){
    //     if($VehicleName !=null){
    //         if($brand !=null){
    //             $SearchResult = Product::where('product_name',$ProdcutName)
    //                                     ->where('vehicle_name',$VehicleName)
    //                                     ->where('product_brand',$brand)
    //                                     ->get();
    //         }else{
    //          $SearchResult = Product::where('product_name',$ProdcutName)
    //                                  ->where('vehicle_name',$VehicleName)
    //                                  ->get();
    //         }
    //     }else{
    //         $SearchResult = Product::where('product_name',$ProdcutName)
    //                                  ->get();
    //     }
    // }else{
    //     if($VehicleName !=null){
    //         if($brand != null){
    //             $SearchResult = Product::where('vehicle_name',$VehicleName)
    //                                     ->where('product_brand',$brand)
    //                                     ->get();
    //         }else{
    //             $SearchResult = Product::where('vehicle_name',$VehicleName)
    //                                     ->get();
    //         }

    //     }
    // }
    $SearchResult = Product::when($ProdcutName, function ($query) use ($ProdcutName) {
        $query->where('product_name', $ProdcutName);
    })
    ->when($VehicleName, function ($query) use ($VehicleName) {
        $query->where('vehicle_name', $VehicleName);
    })
    ->when($brand, function ($query) use ($brand) {
        $query->where('product_brand', $brand);
    })
    ->paginate(20);

    return response([
        'message' => 'Search Result',
        'SearchResult' => $SearchResult
    ],200);

   }
}
