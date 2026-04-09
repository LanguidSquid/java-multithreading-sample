import { Worker } from 'worker_threads';
import { CollatzDataModel } from './model/collatz-data-model';
import { CollatzInfoPrinter } from './util/collatz-info-printer';
import * as path from 'path';

class WorkerPool {
    private workers: Array<{ worker: Worker; busy: boolean }> = [];
    private taskQueue: Array<{ number: number; resolve: (value: CollatzDataModel) => void; reject: (reason: any) => void }> = [];
    private corePoolSize: number;
    private maximumPoolSize: number;

    constructor(corePoolSize: number, maximumPoolSize: number) {
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
    }

    private createWorker(number: number): Worker {
        const worker = new Worker(path.join(__dirname, 'worker/collatz-worker.js'), {
            workerData: { number }
        });
        return worker;
    }

    async execute(number: number): Promise<CollatzDataModel> {
        return new Promise((resolve, reject) => {
            // If we have fewer than corePoolSize workers, create a new one
            if (this.workers.length < this.corePoolSize) {
                const worker = this.createWorker(number);
                this.workers.push({ worker, busy: true });
                this.runTask(worker, resolve, reject);
            }
            // If we can still add workers up to maximumPoolSize, create a new one
            else if (this.workers.length < this.maximumPoolSize) {
                const worker = this.createWorker(number);
                this.workers.push({ worker, busy: true });
                this.runTask(worker, resolve, reject);
            } else {
                // Queue the task if we've hit the maximum
                this.taskQueue.push({ number, resolve, reject });
            }
        });
    }

    private runTask(
        worker: Worker,
        resolve: (value: CollatzDataModel) => void,
        reject: (reason: any) => void
    ): void {
        worker.on('message', (result: any) => {
            resolve(new CollatzDataModel(result.collatzNumber, result.collatzIterations));
            worker.terminate();
        });

        worker.on('error', (error: Error) => {
            reject(error);
            worker.terminate();
        });
    }

    async shutdown(): Promise<void> {
        for (const { worker } of this.workers) {
            await worker.terminate();
        }
        this.workers = [];
    }
}

async function main() {
    const startTime = Date.now();

    const collatzList: CollatzDataModel[] = [];
    const pool = new WorkerPool(1, 10000);

    const promises: Promise<CollatzDataModel>[] = [];
    for (let i = 1; i <= 999; i++) {
        promises.push(pool.execute(i));
    }

    const results = await Promise.all(promises);
    collatzList.push(...results);

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    await pool.shutdown();

    new CollatzInfoPrinter().prettyPrintCollatzList(collatzList);

    console.log(`the elapsed calculation time is ${elapsedTime.toString().padStart(8)} ms`);
}

main().catch(console.error);
