package com.charter.enterprise.collatz.util;

import com.charter.enterprise.collatz.model.CollatzDataModel;

import java.util.Collections;
import java.util.List;

public class CollatzInfoPrinter {

    public void prettyPrintCollatzList(List<CollatzDataModel> collatzList) {
        System.out.flush();

        Collections.sort(collatzList);

        for(CollatzDataModel collatzDataModel : collatzList){
            prettyPrintCollatzDataModel(collatzDataModel);
        }
    }

    public void prettyPrintCollatzDataModel(CollatzDataModel collatzDataModel){
        System.out.format("The number %5d has %5d collatz iterations!%n",
                collatzDataModel.getCollatzNumber(),
                collatzDataModel.getCollatzIterations());
    }

}
