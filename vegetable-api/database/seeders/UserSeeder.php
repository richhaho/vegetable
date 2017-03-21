<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'first_name' => Str::random(7),
            'last_name' => Str::random(5).'@gmail.com',
            'full_name' => Str::random(12),
            'email' => Str::random(10).'@hotmail.com',
            'password' => Hash::make('12345'),
            'phone' => rand(423424234,635345343)
        ]);
    }
}
