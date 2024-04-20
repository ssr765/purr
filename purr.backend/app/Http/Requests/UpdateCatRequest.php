<?php

namespace App\Http\Requests;

use App\Models\Cat;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCatRequest extends FormRequest
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
            'catname' => ['required', 'string', 'unique' . Cat::class, 'not_in:create', 'regex:/^[\w\d\.]{3,30}$/', 'min:3', 'max:30'],
            'breed' => ['nullable', 'string'],
            'color' => ['nullable', 'string'],
            'avatar' => ['nullable', 'image', 'max:8192', 'mimes:jpg,jpeg,png,webp'],
            'biography' => ['nullable', 'string'],
            'birthdate' => ['nullable', 'date'],
            'deathdate' => ['nullable', 'date'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
