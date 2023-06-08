package fd.adse.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderInfo {
    private Long orderItemId;
    private Long userId;
    private String commodityName;
    private String type;
    private BigDecimal totalPrice;
    private int quantity;
    private int status = 0;
    private String msg;
}
