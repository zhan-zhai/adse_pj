package fd.adse.cart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetCartResponse {
    private Long cartItemId;
    private String type;
    private String commodityName;
    private int quantity;
}
