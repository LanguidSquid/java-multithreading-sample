import { CollatzDataModel } from '../model/collatz-data-model';
import { OddEvenDeterminer } from './odd-even-determiner';

export class Collatz {
    private collatzDataModel: CollatzDataModel;
    private oddEvenDeterminer: OddEvenDeterminer;

    constructor(startingNumber: number) {
        this.collatzDataModel = new CollatzDataModel(startingNumber, 0);
        this.oddEvenDeterminer = new OddEvenDeterminer();
    }

    getCollatzInformation(startingNumber: number): CollatzDataModel {
        this.collatzDataModel.setCollatzNumber(startingNumber);
        this.collatzDataModel.setCollatzIterations(this.getCollatzIterations(startingNumber));
        return CollatzDataModel.fromModel(this.collatzDataModel);
    }

    call(): CollatzDataModel {
        return this.getCollatzInformation(this.collatzDataModel.getCollatzNumber());
    }

    getCollatzIterations(startingNumber: number): number {
        let collatzIterations = 0;
        let collatzNumber = startingNumber;

        while (collatzNumber > 1) {
            if (this.oddEvenDeterminer.isOdd(collatzNumber)) {
                collatzIterations++;
                collatzNumber = this.collatzOddIteration(collatzNumber);
            } else {
                collatzIterations++;
                collatzNumber = this.collatzEvenIteration(collatzNumber);
            }
        }

        return collatzIterations;
    }

    collatzOddIteration(collatzNumber: number): number {
        return (collatzNumber * 3) + 1;
    }

    collatzEvenIteration(collatzNumber: number): number {
        return Math.floor(collatzNumber / 2);
    }
}
