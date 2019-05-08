<?php

namespace App;

use Faker\Provider\Payment;
use Illuminate\Database\Eloquent\Model;


/**
 * Class Video
 * @package App
 *
 * @property integer $id
 * @property string $title
 * @property string $link
 * @property string $date
 * @property integer $status
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Comment[] $comments
 */
class Video extends Model
{
    /**
     * @var string
     */
    protected $table='videos';

    /**
     * @var array
     */
    protected $fillable=[
        'title',
        'link',
        'date',
        'status'
    ];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'asc');
    }

    /**
     * @return array
     */
    public function getCommentsAsArray()
    {
        $comments = $this->comments;
        if($comments->isEmpty()) return [];
        foreach ($comments as $comment) {
            if($comment->parent_id !== null) continue;
            $resultArray[] = Comment::getChildrenUntilArmageddon($comment->id);
        }
        return $resultArray;
    }
}
