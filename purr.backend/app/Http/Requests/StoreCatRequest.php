<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'catname' => ['required', 'string', 'unique:cats', 'not_in:create'],
            'sex' => ['required', 'string', 'in:M,F'],
            'breed' => ['nullable', 'string'],
            'color' => ['nullable', 'string'],
            'avatar' => ['nullable', 'string'],
            'biography' => ['nullable', 'string'],
            'birthday' => ['nullable', 'date'],
            'deathdate' => ['nullable', 'date'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
