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

    Route::get('videos', function() {
        return \App\Video::all()->toJson();
    });
    Route::post('video/create', 'VideoController@create');
    Route::get('video/{id}', function($id) {
        return \App\Video::find($id)->toJson();
    });
    Route::post('video/{id}/update', 'VideoController@update');
    Route::post('video/{id}/delete', 'VideoController@delete');
    Route::get('video/{id}/comments', function($id) {
        return \App\Video::find($id)->comments->toJson();
    });


    Route::get('comments', function() {
        return \App\Comment::all()->toJson();
    });
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


Route::get('commens', function() {
    $video = \App\Video::find(1);
    //$comments = $video->getChildrenUntilArmageddon();
    return var_dump($video->getCommentsAsArray());
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});





