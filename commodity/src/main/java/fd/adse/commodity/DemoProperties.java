package fd.adse.commodity;

import java.util.concurrent.ConcurrentHashMap;

import fd.adse.commodity.manager.AbstractManager;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeansException;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "commodity")
public class DemoProperties implements ApplicationContextAware {

    public static DemoProperties INSTANCE;

    private static final ConcurrentHashMap<String, AbstractManager> M_CACHE = new ConcurrentHashMap<>();

    public static <T extends AbstractManager> AbstractManager getManager(Class<T> clz) {
        final String key = clz.getCanonicalName();
        try {
            AbstractManager manager = M_CACHE.get(key);
            if (manager == null) {
                manager = clz.getConstructor(DemoProperties.class).newInstance(INSTANCE);
                M_CACHE.put(key, manager);
            }
            return manager;
        } catch (Exception e) {
            throw new RuntimeException(String.format("Failed initialize %s", clz.getCanonicalName()), e);
        }
    }

    private String fileStorePath = "E://resources/";


    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        INSTANCE = applicationContext.getBean(DemoProperties.class);
    }
}
