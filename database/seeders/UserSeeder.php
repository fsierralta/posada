<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected static ?string $password;

    public function run(): void
    {
        //
        $userSystem = [
            [
                'name' => 'recepcionista',
                'email' => 'recepcionista@posadaloshumacos.com',
                'password' => Hash::make('aUF9bjUt6rbZZXZ'),
            ],
            [
                'name' => 'Sistema',
                'email' => 'sistema@posadaloshumacos.com',
                'password' => Hash::make('pyG@m@XY0qa1'),
            ],
            [
                'name' => 'Gerencia',
                'email' => 'gerencia@posadaloshumacos.com',
                'password' => Hash::make('gerencia*yelitza*98'),

            ],
            [
                'name' => 'yelitza',
                'email' => 'yeli__30@hotmail.com',
                'password' => Hash::make('gerencia*yelitza*98'),

            ],

        ];

        foreach ($userSystem as $user) {
            $existingUser = User::where('email', $user['email'])->first();
            Log::info('Creando usuario:.'.$user['email']);
            if (! $existingUser) {
                try {
                    // code...
                    User::create([
                        'name' => $user['name'],
                        'email' => $user['email'],
                        'email_verified_at' => now(),
                        'password' => $user['password'],
                        'remember_token' => Str::random(10),
                        'verification_code' => null,
                        'verification_code_expire_at' => null,

                    ]);
                    Log::info('Creado usuario:.'.$user['email']);

                } catch (\Exception $th) {
                    // throw $th;
                    Log::error('Creado usuario:.'.$user['email']);

                }

            } else {
                Log::info('Usuario Existe:.'.$user['email']);

            }

        }

        /*   User::create([
              'name' => "recepcionista",
              'email' => "recepcionista@posadaloshumacos.com",
              'email_verified_at' => now(),
              'password' => Hash::make('aUF9bjUt6rbZZXZ'),
              'remember_token' => Str::random(10),
              'verification_code'=>null,
              'verification_code_expire_at'=>null
          ]);

          User::create([
              'name' => "Sistema",
              'email' => "sistema@posadaloshumacos.com",
              'email_verified_at' => now(),
              'password' => Hash::make('pyG@m@XY0qa1'),
              'remember_token' => Str::random(10),
               'verification_code'=>null,
              'verification_code_expire_at'=>null
          ]);

          User::create([
              'name' => "Gerencia",
              'email' => "gerencia@posadaloshumacos.com",
              'email_verified_at' => now(),
              'password' =>Hash::make('gerencia*yelitza*98'),
              'remember_token' => Str::random(10),

              'verification_code'=>null,
              'verification_code_expire_at'=>null
          ]);


     */

    }
}
