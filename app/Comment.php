<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Comment
 * @package App
 *
 * @property integer $id
 * @property string $title
 * @property string $date
 * @property integer $status
 * @property integer $parent_id
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Comment[] $comments
 * @property User $user
 * @property Video $video
 *
 */
class Comment extends Model
{
    /**
     * @var string
     */
    protected $table = 'comments';

    /**
     * @var array
     */
    protected $fillable = [
        'content',
        'user_id',
        'video_id',
        'parent_id'
    ];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function video()
    {
        return $this->belongsTo(Video::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * @param $result
     * @return mixed
     */
    public static function getChildrenUntilArmageddon($id)
    {
        $comment = self::find($id);
        $children = $comment->comments;
        $result['comment'] = self::find($id)->toArray();
        foreach ($children as $child) {
            $result['children'][$child->id] = $child->getChildrenUntilArmageddon($child->id);
        }
        return $result;
    }
}
