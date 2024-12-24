<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class FormaPagoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table("forma_pagos")->insert(
            ['nombre'=>"EFECTIVO BS"]
        );
        DB::table("forma_pagos")->insert(
            ['nombre'=>"PAGO MOVIL BS"]
        );
        DB::table("forma_pagos")->insert(
            ['nombre'=>"TRANSFERENCIA BANCARIA BS"]
        );
        DB::table("forma_pagos")->insert(
            ['nombre'=>"PAGO TARJETA DE DEBITO BS"]
        );
        DB::table("forma_pagos")->insert(
            ['nombre'=>"PAGO TARJETA DE CREDITO BS"]
        );
         //------------------------------------
        DB::table("forma_pagos")->insert(
            ['nombre'=>"EFECTIVO DOLARES"]
        );

        DB::table("forma_pagos")->insert(
            ['nombre'=>"TRANSFERENCIA BANCARIA DOLARES $"]
        );
        DB::table("forma_pagos")->insert(
            ['nombre'=>"PAGO TARJETA DE  DEBITO DOLARES $ "]
        );
        DB::table("forma_pagos")->insert(
            ['nombre'=>"PAGO TARJETA DE CREDITO $"]
        );
        
        DB::table("forma_pagos")->insert(
            ['nombre'=>"PAGO EN ZELLE $"]
        );
        
        

        
    }
}
