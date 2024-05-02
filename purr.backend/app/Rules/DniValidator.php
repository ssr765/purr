<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DniValidator implements ValidationRule
{
    protected $validChars = 'TRWAGMYFPDXBNJZSQVHLCKE';
    protected $regex = '/^(?<DNI>\d{8}[A-Za-z])|(?<NIF>[A-HJNP-SU-Za-hjnp-su-z]\d{7}[A-Za-z])$/';
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if the value is a valid DNI, NIF.
        if (!preg_match($this->regex, $value, $coincidencias)) {
            $fail("The $attribute is not a valid DNI, NIF");
        }

        // Check if the DNI is valid.
        if (!empty($coincidencias['DNI'])) {
            $dni = substr($value, 0, 8);
            $letter = strtoupper(substr($value, -1));
            $validLetter = $this->validChars[$dni % 23];
            if ($letter !== $validLetter) {
                $fail("The $attribute is not a valid DNI");
            }
        }

        // Check if the NIF is valid.
        if (!empty($coincidencias['NIF'])) {
            $NIF = substr($value, 1, 7);
            $firstLetter = strtoupper(substr($value, 0, 1));
            if ($firstLetter === 'Y') {
                $NIF = '1' . $NIF;
            } elseif ($firstLetter === 'Z') {
                $NIF = '2' . $NIF;
            } else {
                $NIF = '0' . $NIF;
            }
            $letter = strtoupper(substr($value, -1));
            $validLetter = $this->validChars[$NIF % 23];
            if ($letter !== $validLetter) {
                $fail("The $attribute is not a valid NIF");
            }
        }
    }
}
