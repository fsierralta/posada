<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PosadaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('posadas')->insert([
            'nombre' => 'HAMAKERIA',
            'capacidad' => 5,
            'descripcion' => 'CABAÑA EQUIPADA CO LENCERIA,',

        ]);
        DB::table('posadas')->insert([
            'nombre' => 'TRINITARIAS',
            'capacidad' => 5,
            'descripcion' => 'CABAÑA EQUIPADA CO LENCERIA,',

        ]);
        DB::table('posadas')->insert([
            'nombre' => 'PARAPARA',
            'capacidad' => 5,
            'descripcion' => 'CABAÑA EQUIPADA CO LENCERIA,',

        ]);
        DB::table('posadas')->insert([
            'nombre' => 'CAÑA BRAVA',
            'capacidad' => 5,
            'descripcion' => 'CABAÑA EQUIPADA CO LENCERIA,',

        ]);
        DB::table('posadas')->insert([
            'nombre' => 'ORQUIDEA',
            'capacidad' => 5,
            'descripcion' => 'CABAÑA EQUIPADA CO LENCERIA,',

        ]);
        DB::table('posadas')->insert([
            'nombre' => 'PALMIRA',
            'capacidad' => 5,
            'descripcion' => 'CABAÑA EQUIPADA CO LENCERIA,',

        ]);
        DB::table('posadas')->insert([
            'nombre' => 'COCORNA',
            'capacidad' => 5,
            'descripcion' => 'CABAÑA EQUIPADA CO LENCERIA,',

        ]);
        DB::table('posadas')->insert([
            'nombre' => 'PEONIA',
            'capacidad' => 5,
            'descripcion' => 'CABAÑA EQUIPADA CO LENCERIA,',

        ]);
        DB::table('posadas')->insert([
            'nombre' => 'EL BUCO',
            'capacidad' => 5,
            'descripcion' => 'CABAÑA EQUIPADA CO LENCERIA,',

        ]);

    }
}
