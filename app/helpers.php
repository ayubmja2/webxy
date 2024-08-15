<?php

    if (!function_exists('fractionToDecimal')) {
        function fractionToDecimal($fraction) {
            // Check if the input contains a space, indicating a mixed fraction (e.g., "1 1/2")
            if (strpos($fraction, ' ') !== false) {
                list($whole, $fractionPart) = explode(' ', $fraction);
                list($numerator, $denominator) = explode('/', $fractionPart);
                return $whole + ($numerator / $denominator);
            }

            // Handle simple fractions (e.g., "1/2")
            if (strpos($fraction, '/') !== false) {
                list($numerator, $denominator) = explode('/', $fraction);
                return $numerator / $denominator;
            }

            // If it's just a whole number, return it as is
            return $fraction;
        }
    }

