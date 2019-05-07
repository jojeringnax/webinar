<?php

namespace App;

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
        return $this->hasMany(Comment::class);
    }
}
