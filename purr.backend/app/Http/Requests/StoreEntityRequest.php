<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEntityRequest extends FormRequest
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
            'name' => 'required|string',
            'dni' => 'required|string|unique:entities',
            'slug' => 'required|string|unique:entities',
            'description' => 'nullable|string',
            'type' => 'required|string',
            'webpage' => 'nullable|string',
            'location' => 'required|string',
            'phone' => 'required|string',
        ];
    }
}
