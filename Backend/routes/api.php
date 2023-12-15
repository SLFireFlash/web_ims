<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/logout', [AuthController::class, 'LogOut']);

    Route::post('/newproduct', [ProductController::class, 'AddProduct']);
    Route::get('/productcount', [ProductController::class, 'productCount']);
    Route::get('/allproducts', [ProductController::class, 'productLoad']);

    Route::post('/updateProduct', [ProductController::class, 'UpdateProduct']);
    Route::post('/removeProduct', [ProductController::class, 'RemoveProduct']);
});




Route::post('/signup', [AuthController::class, 'SingUp']);
Route::post('/login', [AuthController::class, 'LogIn']);

