<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'vehicle_name' => ['required', 'string'],
            'product_name' => ['required','string'],
            'product_brand'=>['required','string'],
            'quantity'=>['required','integer'],
            'buying_price'=>['required','integer'],
            'selling_price'=>['required','integer'],
        ];
    }
}
