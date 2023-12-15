<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use http\Env\Response;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SingUpRequest;
use App\Models\User;






class AuthController extends Controller
{
    public function SingUp(SingUpRequest $request){

        $data = $request->validated();

        if($data['account_token'] == '1'){
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
    
            $token = $user->createToken('main')->plainTextToken;
            return response([
                'user' => $user->name,
                'token' => $token
            ]);
        }else{
            return response([ 
                'message'=>'Wrong Account Token',
            ],401);
            
        }

    }

    public function LogIn(LoginRequest $request){

        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user->name,
            'token' => $token,
            'message'=> 'Login Complete'
        ]);



    }
    public function LogOut(Request $request){


        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }


}
