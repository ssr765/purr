<?php

namespace App\Http\Requests;

use App\Models\Cat;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

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
            'name' => ['nullable', 'string'],
            'catname' => ['nullable', 'string', 'not_in:create', 'regex:/^[\w\d\.]{3,30}$/', 'min:3', 'max:30'],
            'breed' => ['nullable', 'string'],
            'color' => ['nullable', 'string'],
            'biography' => ['nullable', 'string'],
            'adoption' => ['nullable', 'boolean'],
            'password' => ['required', 'string'],
            'new_password' => ['nullable', 'string', 'confirmed',  Rules\Password::min(8)->mixedCase()->letters()->numbers()->symbols()],
        ];
    }
}
