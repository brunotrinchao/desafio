<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'trasactions';

    protected $fillable = ['account_id', 'type', 'value'];

    public function account(){
        return $this->belongsTo(Account::class);
    }
}
