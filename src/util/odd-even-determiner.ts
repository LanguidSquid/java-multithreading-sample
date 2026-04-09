export class OddEvenDeterminer {
    isOdd(potentialOdd: number): boolean {
        if (potentialOdd % 2 !== 0) {
            return true;
        }
        return false;
    }

    isEven(potentialEven: number): boolean {
        return !this.isOdd(potentialEven);
    }
}
