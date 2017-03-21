<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i<10; $i++) {
            DB::table('users')->insert([
                'first_name' => Str::random(7),
                'last_name' => Str::random(5),
                'full_name' => Str::random(12),
                'email' => Str::random(10).'@hotmail.com',
                'password' => Hash::make('12345'),
                'phone' => rand(423424234,635345343),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
    
            DB::table('vegetables')->insert([
                'name' => 'vegetable'. $i,
                'price' => rand(24342,52342),
                'contact_name' => Str::random(12),
                'contact_number' => rand(2342343324,9234234234),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}
