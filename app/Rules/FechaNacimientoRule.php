<?php

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class FechaNacimientoRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string = null): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        $fnacimiento=Carbon::parse($value);
        if(Carbon::now()->diffInYears($fnacimiento)>17){
            $fail('La  :attribute debe se mayor o igual a 18 años')   ;
        }

    }
}
