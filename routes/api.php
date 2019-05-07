<?php

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => ['jwt.auth','api-header']], function () {
    // all routes to protected resources are registered here
    Route::get('users/list', function(){
        $users = App\User::all();
        $response = ['success'=>true, 'data'=>$users];
        return response()->json($response, 201);
    });
});

Route::group(['middleware' => 'api-header'], function () {
    // The registration and login requests doesn't come with tokens
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
});





Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('videos', 'VideoController@index');
Route::get('video/create', 'VideoController@create');
Route::get('video/{id}/update', 'VideoController@update');
Route::get('video/{id}/delete', 'VideoController@delete');
Route::get('video/{id}/comments', 'VideoController@comments');



Route::get('comments', 'CommentController@index');