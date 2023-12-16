<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatProductRequest extends FormRequest
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
            'id' =>['integer'],
            'Quantity' => ['integer'],
            'buying_price'=>['integer'],
            'selling_price' => ['integer'],
            'product_brand'=>['string'],
            'product_name'=>['string'],
            'vehicle_name' =>['string']
        ];
    }
}
