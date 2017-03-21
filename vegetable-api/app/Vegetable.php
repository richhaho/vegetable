<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vegetable extends Model
{
    use HasFactory;
    protected $fillable = [
        "name", "price", "contact_name", "contact_number"
    ];
}
