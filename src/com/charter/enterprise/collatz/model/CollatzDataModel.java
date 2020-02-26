package com.charter.enterprise.collatz.model;

public class CollatzDataModel implements Comparable<CollatzDataModel> {

    private long collatzNumber;

    private long collatzIterations;

    public CollatzDataModel(long collatzNumber, long collatzIterations) {
        this.collatzNumber = collatzNumber;
        this.collatzIterations = collatzIterations;
    }

    public CollatzDataModel(CollatzDataModel collatzDataModel) {
        this.collatzNumber = collatzDataModel.getCollatzNumber();
        this.collatzIterations = collatzDataModel.getCollatzIterations();
    }


    @Override
    public int compareTo(CollatzDataModel collatzDataModel) {
        return Long.compare(this.collatzNumber, collatzDataModel.getCollatzNumber());
    }

    public long getCollatzNumber() {
        return collatzNumber;
    }

    public void setCollatzNumber(long collatzNumber) {
        this.collatzNumber = collatzNumber;
    }

    public long getCollatzIterations() {
        return collatzIterations;
    }

    public void setCollatzIterations(long collatzIterations) {
        this.collatzIterations = collatzIterations;
    }
}
