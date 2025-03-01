<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\UserAliado;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserAliadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faker = Faker::create('es_ES'); // Configura Faker en español

        // Generar 100 aliados de prueba
        for ($i = 0; $i < 100; $i++) {
            UserAliado::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('password'), // Contraseña por defecto
                'remember_token' => \Illuminate\Support\Str::random(10),
            ]);
        }
    

    }
}
