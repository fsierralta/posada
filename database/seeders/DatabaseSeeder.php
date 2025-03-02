<?php

namespace Database\Seeders;

use App\Models\FichaRegistro;
use App\Models\FormaPago;
use App\Models\Posada;
use App\Models\Precio;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            PosadaSeeder::class,
            FormaPagoSeeder::class,
            UserSeeder::class,
            UserAliadoSeeder::class,
            AliadoSeeder::class,


        ]
        );
         
          Precio::factory(1)->create() ;  
          FichaRegistro::factory(1)->create();
          //User::factory(1)->create();
           
        
    }
}
