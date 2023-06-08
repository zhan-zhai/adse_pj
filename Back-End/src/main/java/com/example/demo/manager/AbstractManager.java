package com.example.demo.manager;

import com.example.demo.DemoProperties;

public class AbstractManager {
    protected DemoProperties demoProperties;

    public AbstractManager(DemoProperties logisticsProperties) {
        this.demoProperties = logisticsProperties;
    }
}