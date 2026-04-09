import { CollatzDataModel } from './model/collatz-data-model';
import { Collatz } from './util/collatz';
import { CollatzInfoPrinter } from './util/collatz-info-printer';

const collatz = new Collatz(0);

const startTime = Date.now();

const collatzList: CollatzDataModel[] = [];

for (let i = 1; i <= 999; i++) {
    collatzList.push(collatz.getCollatzInformation(i));
}

const endTime = Date.now();
const elapsedTime = endTime - startTime;

new CollatzInfoPrinter().prettyPrintCollatzList(collatzList);

console.log(`the elapsed calculation time is ${elapsedTime.toString().padStart(8)} ms`);
