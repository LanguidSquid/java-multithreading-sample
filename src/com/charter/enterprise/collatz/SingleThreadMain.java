package com.charter.enterprise.collatz;

import com.charter.enterprise.collatz.model.CollatzDataModel;
import com.charter.enterprise.collatz.util.Collatz;

import java.util.ArrayList;
import java.util.List;

public class SingleThreadMain {

    private static Collatz collatz = new Collatz(0);

    public static void main(String[] args) throws Exception {
        long startTime = System.currentTimeMillis();
        long endTime = 0L;
        long elapsedTime = 0L;

        List<CollatzDataModel> collatzList = new ArrayList<>();

        for(long i = 1L; i <= 999; i++) {
            collatzList.add(collatz.getCollatzInformation(i));
        }

        endTime = System.currentTimeMillis();
        elapsedTime = endTime - startTime;

//        new CollatzInfoPrinter().prettyPrintCollatzList(collatzList);

        System.out.format("the elapsed calculation time is %8d ms", elapsedTime);
    }
}
