<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use http\Env\Response;

//models
use App\Models\Product;
use App\Models\Vehicle;
use App\Models\Brand;
use App\Models\Stock;
use App\Models\Oder;
//requests
use App\Http\Requests\ProductRequest;
use App\Http\Requests\RemoveProductRequest;
use App\Http\Requests\UpdatProductRequest;
use App\Http\Requests\CartRequest;

class ProductController extends Controller
{
    public function AddProduct(ProductRequest $request){        
        
        $data = $request->validated();
        $product = Product::firstOrCreate(['product_name' => $data['product_name']]);
        $vehicle = Vehicle::firstOrCreate(['vehicle_name' => $data['vehicle_name']]);
        $brand = Brand::firstOrCreate(['brand_name' => $data['product_brand']]);
        
        $product = Stock::updateOrCreate(
                    [
                        'product_id' => $product->id,
                        'vehicle_id' => $vehicle->id,
                        'brand_id' => $brand->id,
                    ],
                    [
                        'quantity' => \DB::raw('quantity + ' . $data['quantity']),
                        'buying_price' => $data['buying_price'],
                        'selling_price' => $data['selling_price'],
                    ]
                    );

        return response(
            [
                'message' =>$product -> product_name . ' Added to the database'
            ],200
            );
   }
   public function productCount(Request $request){
        
        $count = Product::count();
        $Quantity = Stock::sum('quantity');

        $maxValue = Stock::join('products', 'stocks.product_id', '=', 'products.id')
                    ->orderByDesc('quantity')
                    ->select('products.product_name', 'stocks.quantity')
                    ->first();

        $minValue = Stock::join('products', 'stocks.product_id', '=', 'products.id')
                    ->orderBy('quantity')
                    ->select('products.product_name', 'stocks.quantity')
                    ->first();

        return response( [
            'productCount' => $count,
            'maxValue' => $maxValue,
            'minValue' => $minValue,

        ],200);
   }
   public function productLoad(Request $request){
        
        $allproducts = Stock::
                        join('products','stocks.product_id','=','products.id')
                        ->join('brands','stocks.brand_id','=','brands.id')
                        ->join('vehicles','stocks.vehicle_id','=','vehicles.id')
                        ->select(
                            'stocks.id as stock_id',
                            'products.id as product_id',
                            'brands.id as brand_id',
                            'vehicles.id as vehicle_id',
                            'stocks.*',
                            'products.*',
                            'brands.*',
                            'vehicles.*'
                        )
                        ->paginate(10);
                        return response([
                            'All_Products'=> $allproducts
                        ],200);
   }

   public function UpdateProduct(UpdatProductRequest $request){
        $data = $request->validated();

        $affectedRows = Stock::join('products', 'stocks.product_id', '=', 'products.id')
                        ->join('brands', 'stocks.brand_id', '=', 'brands.id')
                        ->join('vehicles', 'stocks.vehicle_id', '=', 'vehicles.id')
                        ->where("stocks.id", $data['id'])
                        ->update([
                            "quantity" => \DB::raw("quantity + " . $data['Quantity']),
                            "buying_price" => $data['buying_price'],
                            "selling_price" => $data['selling_price'],
                            "vehicle_name" => $data['vehicle_name'],
                            "brand_name" => $data['product_brand'],
                            "product_name" => $data['product_name'],
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
        $stockId = $data['id'];
        $recordToRem = Stock::where('id',$stockId)->first();

        $pid =$recordToRem->product_id;
        $bid =$recordToRem->brand_id;
        $vid =$recordToRem->vehicle_id;

        $affectedRows = Stock::where('id', $stockId)->delete();
                        Product::where('id',$pid )->delete();
                        Brand::where('id', $bid)->delete();
                        Vehicle::where('id', $vid)->delete();
        
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

    if ($ProdcutName != null or $VehicleName != null or $brand != null){
        $SearchResult = Stock::when($ProdcutName, function ($query) use ($ProdcutName) {
            $query->join('products','stocks.product_id','=','products.id')
                ->join('vehicles','stocks.vehicle_id','=','vehicles.id')
                ->join('brands','stocks.brand_id','=','brands.id')
                ->select('stocks.id', 'vehicles.vehicle_name', 'products.product_name', 'brands.brand_name', 'stocks.quantity', 'stocks.buying_price', 'stocks.selling_price')
                ->where('products.product_name', $ProdcutName);
        })
        ->when($VehicleName, function ($query) use ($VehicleName) {
            $query->join('vehicles','stocks.vehicle_id','=','vehicles.id')
                ->join('products','stocks.product_id','=','products.id')
                ->join('brands','stocks.brand_id','=','brands.id')
                ->select('stocks.id', 'vehicles.vehicle_name', 'products.product_name', 'brands.brand_name', 'stocks.quantity', 'stocks.buying_price', 'stocks.selling_price')
                ->where('vehicles.vehicle_name', $VehicleName);
        })
        ->when($brand, function ($query) use ($brand) {
            $query->join('brands','stocks.brand_id','=','brands.id')
                ->join('products','stocks.product_id','=','products.id')
                ->join('vehicles','stocks.vehicle_id','=','vehicles.id')
                ->select('stocks.id', 'vehicles.vehicle_name', 'products.product_name', 'brands.brand_name', 'stocks.quantity', 'stocks.buying_price', 'stocks.selling_price')
                ->where('brands.brand_name', $brand);
        })
        ->paginate(20);
    }else{
        $SearchResult = Stock::join('products', 'stocks.product_id', '=', 'products.id')
        ->join('vehicles', 'stocks.vehicle_id', '=', 'vehicles.id')
        ->join('brands', 'stocks.brand_id', '=', 'brands.id')
        ->select('stocks.id', 'vehicles.vehicle_name', 'products.product_name', 'brands.brand_name', 'stocks.quantity', 'stocks.buying_price', 'stocks.selling_price')
        ->paginate(20);
    }


    return response([
        'message' => 'Search Result',
        'SearchResult' => $SearchResult
    ],200);

   }
   public function AddToCart(CartRequest $request){

    $data = $request->validated();

    $productId = Product::firstOrCreate(['product_name' => $request->input('product_name')])->id;
    $vehicleId = Vehicle::firstOrCreate(['vehicle_name' => $request->input('vehicle_name')])->id;
    $brandId = Brand::firstOrCreate(['brand_name' => $request->input('brand_name')])->id;
    
    $oder = Oder::create([
        'product_id' => $productId,
        'vehicle_id' => $vehicleId,
        'brand_id' => $brandId,
        'user_id' => $request->input('user_id'),
        'quantity' => $request->input('quantity'),
        'buying_price' => $request->input('buying_price'),
        'selling_price' => $request->input('selling_price'),
    ]);
    return response(
        [
            'message' =>'Product Added to cart'
        ],200
        );
   }
}
