<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class QuestionComment extends Model
{
    use Notifiable;

    const TYPE_USER = 'App/Models/User';
    const TYPE_STUDENT = 'App/Models/Student';

    protected $table = 'question_comments';

    const TYPE_FIELD = 'type';
    const USER_ID_FIELD = 'user_id';
    const QUESTION_ID_FIELD = 'question_id';
    const CONTENT_FIELD = 'content';

    protected $fillable = [
        QuestionComment::QUESTION_ID_FIELD,
        QuestionComment::USER_ID_FIELD,
        QuestionComment::CONTENT_FIELD,
        QuestionComment::TYPE_FIELD,
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, QuestionComment::USER_ID_FIELD, 'id')
            ->where(QuestionComment::USER_ID_FIELD, QuestionComment::TYPE_USER);
    }

    public function student()
    {
        return $this->belongsTo(Student::class, QuestionComment::USER_ID_FIELD, 'id')
            ->where(QuestionComment::USER_ID_FIELD, QuestionComment::TYPE_STUDENT);
    }
}