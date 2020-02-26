package com.charter.enterprise.collatz.util;

public class OddEvenDeterminer {

    public boolean isOdd(long potentialOdd) {
        if(potentialOdd % 2 != 0) {
            return true;
        }

        return false;
    }

    public boolean isEven(long potentialEven) {
        return !isOdd(potentialEven);
    }
}
