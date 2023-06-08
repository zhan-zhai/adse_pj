package fd.adse.order.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class OrderItem extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @JsonIgnore
    private Order order;

    private Long typeId;
    private Long sellerId;
    private int quantity;
    private BigDecimal totalPrice;
    private String addressMerge;
    private String receiverName;
    private String phoneNumber;
    private int status;
    private String deliveryInfo;

    public OrderItem() {
    }

    public OrderItem(Order order, Long typeId, Long sellerId, int quantity, BigDecimal totalPrice, String addressMerge, String receiverName, String phoneNumber, int status) {
        this.order = order;
        this.typeId = typeId;
        this.sellerId = sellerId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.addressMerge = addressMerge;
        this.receiverName = receiverName;
        this.phoneNumber = phoneNumber;
        this.status = status;
    }
}
