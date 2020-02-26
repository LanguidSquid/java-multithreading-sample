package com.blake.multithreaded.collatz;

import com.blake.multithreaded.collatz.model.CollatzDataModel;
import com.blake.multithreaded.collatz.util.Collatz;
import com.blake.multithreaded.collatz.util.CollatzInfoPrinter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class AdvancedCachedMultithreadedMain {

    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        long endTime = 0L;
        long elapsedTime = 0L;

        List<Future<CollatzDataModel>> collatzFutureList = new ArrayList<>();
        List<CollatzDataModel> collatzList = new ArrayList<>();
        ExecutorService executors = new ThreadPoolExecutor(1, 10000, 5, TimeUnit.SECONDS, new LinkedBlockingQueue<>());

        for(int i = 1; i <= 999; i++) {
            collatzFutureList.add(executors.submit(new Collatz(i)));
        }

        for(Future collatzFuture : collatzFutureList) {
            Object o = collatzFuture.get();

            if(o instanceof CollatzDataModel) {
                collatzList.add((CollatzDataModel) o);
            }
        }

        endTime = System.currentTimeMillis();
        elapsedTime = endTime - startTime;

        executors.shutdown();

        new CollatzInfoPrinter().prettyPrintCollatzList(collatzList);

        System.out.format("the elapsed calculation time is %8d ms", elapsedTime);
    }
}
