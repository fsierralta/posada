<?php

namespace Database\Seeders;

use App\Models\FichaRegistro;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FichaRegistroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        FichaRegistro::factory(1)->create();
    }
}
