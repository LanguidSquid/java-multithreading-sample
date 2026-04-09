export class CollatzDataModel {
    private collatzNumber: number;
    private collatzIterations: number;

    constructor(collatzNumber: number, collatzIterations: number) {
        this.collatzNumber = collatzNumber;
        this.collatzIterations = collatzIterations;
    }

    static fromModel(model: CollatzDataModel): CollatzDataModel {
        return new CollatzDataModel(model.getCollatzNumber(), model.getCollatzIterations());
    }

    compareTo(other: CollatzDataModel): number {
        return this.collatzNumber - other.collatzNumber;
    }

    getCollatzNumber(): number {
        return this.collatzNumber;
    }

    setCollatzNumber(collatzNumber: number): void {
        this.collatzNumber = collatzNumber;
    }

    getCollatzIterations(): number {
        return this.collatzIterations;
    }

    setCollatzIterations(collatzIterations: number): void {
        this.collatzIterations = collatzIterations;
    }
}
