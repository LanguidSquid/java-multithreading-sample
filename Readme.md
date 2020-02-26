Multithreading with Collatz
======

This is just a basic example of multithreading.

In `com.charter.enterprise.collatz.SingleThreadMain` you will find a basic usage
of our `com.charter.enterprise.collatz.util.Collatz` object to calculate
collatz iterations on a set of numbers. 

For reference on the Collatz Algorithm see the [Wikipedia Article](https://en.wikipedia.org/wiki/Collatz_conjecture)

#### Basic Multithreading
In `com.charter.enterprise.collatz.BasicMultithreadedMain` you will find an updated version of the logic 
from `SingleThreadMain` that takes advantage of some of Java's built-in multithreading 
utilities.

In `BasicMultithreadedMain` we create a simple `ExecutorService` using the `newFixedThreadPool(int)`
method. The executor service:

* Automatically creates and manages a `ThreadPool` of the `int` size passed in to the 
`newFixedThreadPool` method.
* Automatically destroys and stops all threads in the `ThreadPool` when the `shutdown()`
method is called
    * This prevents you (the developer) from having to worry about memory leaks from rogue 
    threads.
* Automatically delegates tasks passed to the `ExecutorService.submit(Callable<>)` method to 
idle threads from the `ThreadPool`

#### More Advanced Multithreading
    
In `AdvancedCachedMultithreadedMain` we create a more advanced `CachedExecutorService`

This is done with the `ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, int keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue)` constructor.
* If fewer than `corePoolSize` threads are running, the `Executor` always prefers adding a new thread rather than queuing.
* If `corePoolSize` or more threads are running, the `Executor` always prefers queuing a request rather than adding a new thread.
* If a request cannot be queued, a new thread is created unless this would exceed `maximumPoolSize`, in which case, the task will be rejected.

The queuing strategy, which is the core value offered by a `CachedExecutorService` is determined by the type of `BlockingQueue` passed into our constructor.

There are three common queuing strategies and three associated default Java implementations of these strategies.
* The _Direct Handoff_ strategy (implemented by the native Java Queue `SynchronousQueue`):
    * Hands off tasks to threads without otherwise holding them. 
    * Attempts to queue a task will fail if no threads are immediately available to run that task, so a new thread will be constructed. 
    * Avoids lockups when handling sets of requests that might have internal dependencies. 
    * Require unbounded `maximumPoolSize`s to avoid rejection of new submitted tasks. 
    * Admits the possibility of unbounded thread growth when commands continue to arrive on average faster than they can be processed.
    
* The _Unbounded Queue_ strategy (implemented by the native Java Queue `LinkedBlockingQueue`):
    * Causes new tasks to wait in the queue when all `corePoolSize` threads are busy. 
    * No more than `corePoolSize` threads will ever be created. (the `maximumPoolSize` has no effect.) 
    * Appropriate when each task is completely independent of others, so tasks cannot affect each others' execution; for example, in a web server. 
    * Useful in smoothing out transient bursts of requests. 
    * Admits the possibility of unbounded work queue growth when commands continue to arrive on average faster than they can be processed.
    
* The _Bounded Queue_ strategy (implemented by the native Java Queue `ArrayBlockingQueue`):
    * Prevents resource exhaustion when used with finite `maximumPoolSizes`, but can be more difficult to tune and control. 
    * `queueSize` and `maximumPoolSize` may be traded off for one another
        * Using large queues and small pools minimizes CPU usage, OS resources, and context-switching overhead.
        * Can lead to artificially low throughput. If tasks frequently block (for example if they are I/O bound), a system may be able to schedule time for more threads than you otherwise allow. 
        * Small queues require larger pool sizes, which keeps CPUs busier but may encounter unacceptable scheduling overhead, which also decreases throughput.

#### Resource Monitoring

In order to monitor the memory/processing overhead created by these single and multithreaded
processes on a Mac computer:
1. press  `⌘ + space`
2. in the search bar, type: `Activity Monitor`
3. open the `Activity Monitor`
4. the most valuable view tabs in the top-bar of the `Activity Monitor` are probably `CPU` and `Memory` respectively.
    * notice the `Threads` column in the data presented.
