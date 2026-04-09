import { Worker } from 'worker_threads';
import { CollatzDataModel } from './model/collatz-data-model';
import { CollatzInfoPrinter } from './util/collatz-info-printer';
import * as path from 'path';

const THREAD_COUNT = 3;

async function runCollatzInWorker(number: number): Promise<CollatzDataModel> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, 'worker/collatz-worker.js'), {
            workerData: { number }
        });

        worker.on('message', (result) => {
            resolve(new CollatzDataModel(result.collatzNumber, result.collatzIterations));
        });

        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

async function main() {
    const startTime = Date.now();

    const promises: Promise<CollatzDataModel>[] = [];
    const collatzList: CollatzDataModel[] = [];

    // Create a pool of workers
    const tasks: number[] = [];
    for (let i = 1; i <= 999; i++) {
        tasks.push(i);
    }

    // Process tasks with limited concurrency
    for (let i = 0; i < tasks.length; i += THREAD_COUNT) {
        const batch = tasks.slice(i, Math.min(i + THREAD_COUNT, tasks.length));
        const batchPromises = batch.map(num => runCollatzInWorker(num));
        const results = await Promise.all(batchPromises);
        collatzList.push(...results);
    }

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    new CollatzInfoPrinter().prettyPrintCollatzList(collatzList);

    console.log(`the elapsed calculation time is ${elapsedTime.toString().padStart(8)} ms`);
}

main().catch(console.error);
