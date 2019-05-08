<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * @param Comment $comment
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function store(Comment $comment, Request $request)
    {
        if ($comment === null) return response('Not found video', 404);
        $comment->fill($request->post());
        if ($comment->save()) {
            return $comment->toJson();
        }
        return response('Not saved'.var_dump($comment), 405);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function create(Request $request)
    {
        return $this->store(new Comment, $request);
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response|string
     */
    public function update($id, Request $request)
    {
        return $this->store(Comment::findOrFail($id), $request);
    }
}
