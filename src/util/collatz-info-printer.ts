import { CollatzDataModel } from '../model/collatz-data-model';

export class CollatzInfoPrinter {
    prettyPrintCollatzList(collatzList: CollatzDataModel[]): void {
        collatzList.sort((a, b) => a.compareTo(b));

        for (const collatzDataModel of collatzList) {
            this.prettyPrintCollatzDataModel(collatzDataModel);
        }
    }

    prettyPrintCollatzDataModel(collatzDataModel: CollatzDataModel): void {
        const number = collatzDataModel.getCollatzNumber().toString().padStart(5);
        const iterations = collatzDataModel.getCollatzIterations().toString().padStart(5);
        console.log(`The number ${number} has ${iterations} collatz iterations!`);
    }
}
