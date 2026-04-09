Multithreading with Collatz
======

This is just a basic example of multithreading in TypeScript.

In `src/single-thread-main.ts` you will find a basic usage
of our `Collatz` class to calculate collatz iterations on a set of numbers.

For reference on the Collatz Algorithm see the [Wikipedia Article](https://en.wikipedia.org/wiki/Collatz_conjecture)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then build the TypeScript code:

```bash
npm run build
```

Run the different implementations:

```bash
# Single-threaded version
npm run single-thread

# Basic multithreaded version
npm run basic-multithread

# Advanced cached multithreaded version
npm run advanced-multithread
```

## Basic Multithreading

In `src/basic-multithreaded-main.ts` you will find an updated version of the logic
from `single-thread-main.ts` that takes advantage of Node.js's Worker Threads for multithreading.

In `basic-multithreaded-main.ts` we create a simple worker pool that:

* Processes tasks in batches using a fixed number of worker threads (3 workers by default)
* Each worker thread runs independently and calculates Collatz iterations
* Workers are managed through Node.js's `worker_threads` module
* Tasks are distributed across the worker pool to maximize CPU utilization

## More Advanced Multithreading

In `src/advanced-cached-multithreaded-main.ts` we create a more advanced `WorkerPool` class
that mimics Java's `ThreadPoolExecutor` behavior:

* If fewer than `corePoolSize` workers are running, the pool always prefers adding a new worker rather than queuing
* If `corePoolSize` or more workers are running, the pool always prefers queuing a request rather than adding a new worker
* If a request cannot be queued, a new worker is created unless this would exceed `maximumPoolSize`, in which case the task will be queued

The queuing strategy, which is the core value offered by a cached worker pool:

* **Unbounded Queue** strategy (implemented with an array-based queue):
    * Causes new tasks to wait in the queue when all `corePoolSize` workers are busy
    * Similar to Java's `LinkedBlockingQueue` behavior
    * Appropriate when each task is completely independent of others
    * Useful in smoothing out transient bursts of requests
    * Can admit the possibility of unbounded work queue growth when tasks continue to arrive faster than they can be processed

The TypeScript implementation uses Node.js Worker Threads which provide:
* True parallel execution (unlike traditional Node.js event loop)
* Isolated execution contexts for each worker
* Message-based communication between main thread and workers
* Automatic resource cleanup when workers are terminated

## Resource Monitoring

To monitor the memory/processing overhead created by these single and multithreaded
processes:

### On macOS:
1. Press `⌘ + space`
2. In the search bar, type: `Activity Monitor`
3. Open the `Activity Monitor`
4. The most valuable view tabs in the top-bar of the `Activity Monitor` are probably `CPU` and `Memory` respectively
    * Notice the `Threads` column in the data presented

### On Linux:
Use `top` or `htop` to monitor CPU and memory usage

### On Windows:
1. Press `Ctrl + Shift + Esc` to open Task Manager
2. Go to the `Performance` tab to see CPU and memory usage
3. The `Processes` tab shows individual thread counts
