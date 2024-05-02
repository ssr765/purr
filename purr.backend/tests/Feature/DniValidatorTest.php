<?php

namespace Tests\Feature;

use App\Rules\DniValidator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class DniValidatorTest extends TestCase
{
    /**
     * Data provider for DNIs.
     */
    public static function dniProvider()
    {
        return [
            ['12345678Z', true],
            ['12345678A', false],
            ['asdasdasd', false],
            ['F1234567S', false],
            ['X1234567L', true],
            ['Y1234567X', true],
            ['Z1234567R', true],
            ['00000000T', true]
        ];
    }

    /**
     * Test DNI validation.
     * @dataProvider dniProvider
     */
    public function testDniValidator($dni, $expectedResult): void
    {
        $validator = Validator::make(
            ['dni' => $dni],
            ['dni' => ['required', 'string', new DniValidator()]]
        );

        $this->assertSame($expectedResult, $validator->passes());
    }
}
