package fd.adse.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class WalletPayRequest {
    private Long userId;
    private Long orderItemId;
    private BigDecimal totalPrice;

    public WalletPayRequest() {
    }

    public WalletPayRequest(Long userId, Long orderItemId, BigDecimal totalPrice) {
        this.userId = userId;
        this.totalPrice = totalPrice;
        this.orderItemId = orderItemId;
    }
}
