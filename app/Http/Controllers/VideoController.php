<?php

namespace App\Http\Controllers;

use App\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    /**
     * @param Video $video
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Video $video, Request $request)
    {
        if ($video === null) return response('Not found video', 404);
        $video->fill($request->post());
        if ($video->save()) {
            return $video->toJson();
        }
        return response('Not saved'.var_dump($video), 405);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function create(Request $request)
    {
        return $this->store(new Video, $request);
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function update($id, Request $request)
    {
        return $this->store(Video::findOrFail($id), $request);
    }
}
