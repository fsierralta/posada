<?php

namespace Database\Seeders;

use App\Models\Aliado;
use App\Models\UserAliado;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class AliadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faker = Faker::create('es_ES'); // Configura Faker en español
        $userAliadosIds = UserAliado::pluck('id')->toArray();
        for ($i = 0; $i < 100; $i++) {
            Aliado::create([
                'user_aliado_id' => $faker->randomElement($userAliadosIds), // Relación con user_aliados
                'name' => $faker->company, // Nombre de la empresa
                'rif' => $faker->unique()->regexify('J-\d{8}-\d'), // RIF único (ej: J-12345678-9)
                'tipo' => $faker->randomElement(['J', 'G', 'P']), // Tipo de aliado
                'direccion' => $faker->address, // Dirección
                'ciudad' => $faker->city, // Ciudad
                'estado' => $faker->state, // Estado
                'telefono' => $faker->phoneNumber, // Teléfono
                'email' => $faker->unique()->companyEmail, // Correo electrónico único
            ]);
        }

    }
}
