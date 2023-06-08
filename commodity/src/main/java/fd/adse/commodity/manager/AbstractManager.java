package fd.adse.commodity.manager;


import fd.adse.commodity.DemoProperties;

public class AbstractManager {
    protected DemoProperties demoProperties;

    public AbstractManager(DemoProperties logisticsProperties) {
        this.demoProperties = logisticsProperties;
    }
}