package fd.adse.notification.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Queues {

    public final static String queuePay = "queuePay";
    public final static String queueDeliver = "queueDeliver";
    public final static String queueConfirm = "queueConfirm";

    public final static String queueOrder = "order";

    @Bean(queuePay)
    public Queue queuePay() {
        return new Queue(queuePay);
    }
    @Bean(queueDeliver)
    public Queue queueDeliver() {
        return new Queue(queueDeliver);
    }
    @Bean(queueConfirm)
    public Queue queueConfirm() {
        return new Queue(queueConfirm);
    }

    @Bean(queueOrder)
    public Queue queueOrder() {
        return new Queue(queueOrder);
    }
}