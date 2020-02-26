package com.charter.enterprise.collatz;

import com.charter.enterprise.collatz.model.CollatzDataModel;
import com.charter.enterprise.collatz.util.Collatz;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class BasicMultithreadedMain {
    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        long endTime = 0L;
        long elapsedTime = 0L;

        List<Future<CollatzDataModel>> collatzFutureList = new ArrayList<>();
        List<CollatzDataModel> collatzList = new ArrayList<>();
        ExecutorService executors = Executors.newFixedThreadPool(3);

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

//        new CollatzInfoPrinter().prettyPrintCollatzList(collatzList);

        System.out.format("the elapsed calculation time is %8d ms", elapsedTime);
    }
}
