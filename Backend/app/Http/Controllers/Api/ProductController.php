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
use App\Http\Requests\LoadCartRequest;

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
   public function ProductSearch(Request $request){
    try{
        $ProdcutName = $request['ProductName'];
        $VehicleName =$request['VehicleName'];
        $brand =$request['Brand'];
        $SearchResult ='';

        if ($ProdcutName != null or $VehicleName != null or $brand != null){
            $SearchResult = Stock::when($ProdcutName, function ($query) use ($ProdcutName) {
                $query->join('brands as b1', 'stocks.brand_id', '=', 'b1.id')
                    ->join('products as p1', 'stocks.product_id', '=', 'p1.id')
                    ->join('vehicles as v1', 'stocks.vehicle_id', '=', 'v1.id')
                    ->select('stocks.id', 'v1.vehicle_name', 'p1.product_name', 'b1.brand_name', 'stocks.quantity', 'stocks.buying_price', 'stocks.selling_price')
                    ->where('p1.product_name', $ProdcutName);
            })
            ->when($VehicleName, function ($query) use ($VehicleName) {
                $query->join('brands as b2', 'stocks.brand_id', '=', 'b2.id')
                    ->join('products as p2', 'stocks.product_id', '=', 'p2.id')
                    ->join('vehicles as v2', 'stocks.vehicle_id', '=', 'v2.id')
                    ->select('stocks.id', 'v2.vehicle_name', 'p2.product_name', 'b2.brand_name', 'stocks.quantity', 'stocks.buying_price', 'stocks.selling_price')
                    ->where('v2.vehicle_name', $VehicleName);
            })
            ->when($brand, function ($query) use ($brand) {
                $query->join('brands as b3', 'stocks.brand_id', '=', 'b3.id')
                    ->join('products as p3', 'stocks.product_id', '=', 'p3.id')
                    ->join('vehicles as v3', 'stocks.vehicle_id', '=', 'v3.id')
                    ->select('stocks.id', 'v3.vehicle_name', 'p3.product_name', 'b3.brand_name', 'stocks.quantity', 'stocks.buying_price', 'stocks.selling_price')
                    ->where('b3.brand_name', $brand);
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
    }catch (\Exception $e) {
        return response([
            'message' => 'Search Failed',
            'error' => $e->getMessage() 
        ], 500);
    }
   }
   public function AddToCart(CartRequest $request)
   {
       try {
           $data = $request->validated();
   
           $productId = Product::firstOrCreate(['product_name' => $request->input('product_name')])->id;
           $vehicleId = Vehicle::firstOrCreate(['vehicle_name' => $request->input('vehicle_name')])->id;
           $brandId = Brand::firstOrCreate(['brand_name' => $request->input('brand_name')])->id;
           
           $order = Oder::where('product_id', $productId)
                        ->where('vehicle_id', $vehicleId)
                        ->where('brand_id', $brandId)
                        ->where('user_id', $request->input('user_id'))
                        ->first();
            if ($order) {
                $order->quantity += $request->input('quantity');
                $order->save();
            }else{
                $order = Oder::create([
                    'product_id' => $productId,
                    'vehicle_id' => $vehicleId,
                    'brand_id' => $brandId,
                    'user_id' => $request->input('user_id'),
                    'quantity' => $request->input('quantity'),
                    'buying_price' => $request->input('buying_price'),
                    'selling_price' => $request->input('selling_price'),
                ]);
            }
   
   
           return response([
               'message' => 'Product Added to cart'
           ], 200);
       } catch (\Exception $e) {
           return response([
               'message' => 'Failed to add product to cart',
               'error' => $e->getMessage() 
           ], 500);
       }
   }

   public function LoadCart(LoadCartRequest $request){
        $data = $request ->validated();
        $user_id = $data['userid'];

        $orders = Oder::join('products', 'oders.product_id', '=', 'products.id')
                        ->join('vehicles', 'oders.vehicle_id', '=', 'vehicles.id')
                        ->join('stocks', function ($join) {
                            $join->on('stocks.product_id', '=', 'oders.product_id')
                                ->on('stocks.vehicle_id', '=', 'oders.vehicle_id')
                                ->on('stocks.brand_id', '=', 'oders.brand_id');
                        })
                        ->select('products.product_name as product_name', 'vehicles.vehicle_name as vehicle_name', 'stocks.quantity', 'stocks.selling_price','oders.id')
                        ->where('user_id',$user_id)
                        ->get();

        if($orders){
            return response(
                [
                    'data'=>$orders
                ],200
                );
        }
        else{
            return response(
                [
                    'message'=>'Cart data error'
                ],500
                );
        }

   }
}
