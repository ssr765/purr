<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class EmailValidator implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $fail("Email is not valid.");
        }

        // Check if the domain has a valid MX record.
        $domain = substr(strrchr($value, "@"), 1);
        
        if (!checkdnsrr($domain, "MX")) {
            $fail("Email domain is not valid.");
        }
    }
}
