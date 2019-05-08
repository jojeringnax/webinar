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

    Route::get('videos', 'VideoController@index');
    Route::post('video/create', 'VideoController@create');
    Route::post('video/{id}/update', 'VideoController@update');
    Route::post('video/{id}/delete', 'VideoController@delete');
    Route::get('video/{id}/comments', 'VideoController@comments');

    Route::get('comments', 'CommentController@index');
    Route::post('comment/create', 'CommentController@create');
    Route::post('comment/{id}/update', 'CommentController@update');
    Route::post('comment/{id}/delete', 'CommentController@delete');
    Route::get('comment/{id}/comments', 'CommentController@comments');

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





