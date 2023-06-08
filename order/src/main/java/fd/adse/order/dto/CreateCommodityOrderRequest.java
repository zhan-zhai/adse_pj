package fd.adse.order.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommodityOrderRequest {
    private Long typeId;
    private Long addressId;
    private int quantity;

}
