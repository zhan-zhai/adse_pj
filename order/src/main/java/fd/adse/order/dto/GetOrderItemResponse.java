package fd.adse.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class GetOrderItemResponse {
    private Long sellerId;
    private BigDecimal totalPrice;
}
