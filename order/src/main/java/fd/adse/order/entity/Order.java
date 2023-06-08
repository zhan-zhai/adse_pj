package fd.adse.order.entity;

import com.google.common.collect.Sets;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "order_t")
@Getter
@Setter
public class Order extends BaseEntity{

    private Long userId;
    private Long accId;
    private BigDecimal paymentAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<OrderItem> orderItems = Sets.newHashSet();

    public Order() {
    }

    public Order(Long userId, BigDecimal paymentAmount) {
        this.userId = userId;
        this.paymentAmount = paymentAmount;
    }

    public Order(Long userId, Long accId, BigDecimal paymentAmount) {
        this.userId = userId;
        this.accId = accId;
        this.paymentAmount = paymentAmount;
    }
}
