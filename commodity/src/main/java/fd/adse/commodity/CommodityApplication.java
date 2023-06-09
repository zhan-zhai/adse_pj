package fd.adse.commodity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@EnableRedisHttpSession
@EnableDiscoveryClient
@SpringBootApplication
public class CommodityApplication {
    public static void main(String[] args) {
        SpringApplication.run(CommodityApplication.class, args);
    }
}
