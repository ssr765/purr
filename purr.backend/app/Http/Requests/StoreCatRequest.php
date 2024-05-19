<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreCatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'catname' => ['required', 'string', 'unique:cats', 'not_in:create', 'regex:/^[\w\d\.]{3,30}$/', 'min:3', 'max:30'],
            'sex' => ['required', 'string', 'in:M,F'],
            'breed' => ['nullable', 'string'],
            'color' => ['nullable', 'string'],
            'avatar' => ['nullable', 'image', 'max:20480', 'mimes:jpg,jpeg,png,webp'],
            'biography' => ['nullable', 'string'],
            'birthdate' => ['required', 'date'],
            'deathdate' => ['nullable', 'date'],
            'password' => ['required', 'confirmed', Rules\Password::min(8)->mixedCase()->letters()->numbers()->symbols()],
        ];
    }
}
