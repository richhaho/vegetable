<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post("user-signup", "UserController@userSignUp");
Route::post("user-login", "UserController@userLogin");
Route::get("user/{email}", "UserController@userDetail");
Route::post('/create-vegetable','VegetableController@createVegetable');
Route::get('/vegetables', 'VegetableController@vegetablesListing');
Route::get('/vegetable/{id}', 'VegetableController@vegetableDetail');
Route::delete('/vegetable/{id}', 'VegetableController@vegetableDelete');
