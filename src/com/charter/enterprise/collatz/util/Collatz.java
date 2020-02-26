package com.charter.enterprise.collatz.util;

import com.charter.enterprise.collatz.model.CollatzDataModel;

import java.util.concurrent.Callable;

public class Collatz implements Callable<CollatzDataModel> {

    CollatzDataModel collatzDataModel;

    OddEvenDeterminer oddEvenDeterminer = new OddEvenDeterminer();

    public Collatz(long startingNumber) {
        this.collatzDataModel = new CollatzDataModel(startingNumber, 0);
    }

    public CollatzDataModel getCollatzInformation(long startingNumber) {
        collatzDataModel.setCollatzNumber(startingNumber);
        collatzDataModel.setCollatzIterations(getCollatzIterations(startingNumber));

        return new CollatzDataModel(collatzDataModel);
    }

    public CollatzDataModel call() {
        return getCollatzInformation(collatzDataModel.getCollatzNumber());
    }

    public long getCollatzIterations(long startingNumber){
        long collatzIterations = 0;
        long collatzNumber = startingNumber;

        while (collatzNumber > 1) {
            if (oddEvenDeterminer.isOdd(collatzNumber)) {
                collatzIterations++;
                collatzNumber = collatzOddIteration(collatzNumber);
            } else {
                collatzIterations++;
                collatzNumber = collatzEvenIteration(collatzNumber);
            }
        }

        return collatzIterations;
    }

    public long collatzOddIteration(long collatzNumber) {
        return ((collatzNumber * 3) + 1);
    }

    public long collatzEvenIteration(long collatzNumber) {
        return (collatzNumber / 2);
    }
}
