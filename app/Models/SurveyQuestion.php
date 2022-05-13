<?php

namespace App\Models;

use App\Models\Survey;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['question', 'data', 'type', 'survey_id', 'description'];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
}
