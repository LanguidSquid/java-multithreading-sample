import { parentPort, workerData } from 'worker_threads';
import { Collatz } from '../util/collatz';

if (parentPort) {
    const { number } = workerData;
    const collatz = new Collatz(number);
    const result = collatz.call();

    parentPort.postMessage({
        collatzNumber: result.getCollatzNumber(),
        collatzIterations: result.getCollatzIterations()
    });
}
